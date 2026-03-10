'use client';

import NextLink from 'next/link';
import {
  useParams as useNextParams,
  usePathname,
  useRouter,
  useSearchParams as useNextSearchParams,
} from 'next/navigation';
import { useEffect, useMemo } from 'react';

type ToValue =
  | string
  | {
      pathname?: string;
      search?: string;
      hash?: string;
    };

function normalizeTo(to: ToValue) {
  if (typeof to === 'string') {
    return to;
  }

  const pathname = to.pathname ?? '';
  const search = to.search ?? '';
  const hash = to.hash ?? '';
  return `${pathname}${search}${hash}`;
}

type CompatLinkProps = Omit<React.ComponentProps<typeof NextLink>, 'href'> & {
  to: ToValue;
};

export function BrowserRouter({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function Routes({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function Route(_props: Record<string, unknown>) {
  return null;
}

export function Link({ to, ...props }: CompatLinkProps) {
  return <NextLink {...props} href={normalizeTo(to)} />;
}

export function useLocation() {
  const pathname = usePathname();

  return useMemo(
    () => ({
      pathname,
      search: '',
      hash: '',
      state: null,
      key: pathname,
    }),
    [pathname]
  );
}

type SearchParamInit =
  | URLSearchParams
  | Record<string, string | number | boolean | null | undefined>
  | string;

export function useSearchParams() {
  const nextSearchParams = useNextSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const params = useMemo(
    () => new URLSearchParams(nextSearchParams.toString()),
    [nextSearchParams]
  );

  const setSearchParams = (nextValue: SearchParamInit) => {
    const nextParams =
      nextValue instanceof URLSearchParams
        ? new URLSearchParams(nextValue.toString())
        : typeof nextValue === 'string'
          ? new URLSearchParams(nextValue)
          : new URLSearchParams(
              Object.entries(nextValue).reduce<Record<string, string>>((acc, [key, value]) => {
                if (value !== null && value !== undefined) {
                  acc[key] = String(value);
                }
                return acc;
              }, {})
            );

    const query = nextParams.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  return [params, setSearchParams] as const;
}

export function useParams<T extends Record<string, string | string[] | undefined>>() {
  return useNextParams<T>();
}

export function Navigate({ to, replace = false }: { to: ToValue; replace?: boolean }) {
  const router = useRouter();
  const href = normalizeTo(to);

  useEffect(() => {
    if (replace) {
      router.replace(href);
      return;
    }

    router.push(href);
  }, [href, replace, router]);

  return null;
}
