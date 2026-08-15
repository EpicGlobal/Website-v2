import type { ReactNode } from 'react';
import { siteConfig } from '@/site/site-config';

function PolicySection({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={`privacy-section-${number}`}>
      <h2
        id={`privacy-section-${number}`}
        className="text-2xl font-semibold text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900 mb-4"
      >
        {number}. {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function BulletList({ children }: { children: ReactNode }) {
  return (
    <ul className="list-disc space-y-2 ml-6 marker:text-cyan-300 light:marker:text-green-700 orange:marker:text-orange-800 leaf:marker:text-sky-900 water:marker:text-lime-900">
      {children}
    </ul>
  );
}

const policyLinkClassName =
  'text-cyan-300 light:text-green-800 orange:text-orange-900 leaf:text-sky-900 water:text-lime-900 underline';

export function Privacy() {
  return (
    <div className="min-h-screen text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-gray-900 leaf:text-gray-900 water:text-gray-900 bg-gradient-to-br dark:from-cyan-950 dark:via-slate-900 dark:to-black soft-dark:from-lime-400 soft-dark:via-lime-100 soft-dark:to-white leaf:from-[#00A8EA] leaf:via-cyan-100 leaf:to-white water:from-lime-500 water:via-lime-100 water:to-white orange:from-[#F68932] orange:via-orange-100 orange:to-white">
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-wider text-cyan-300 light:text-green-800 orange:text-orange-900 leaf:text-sky-900 water:text-lime-900 mb-3">
            Legal and privacy
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-5 text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900">
            Data Protection and Privacy Policy
          </h1>
          <p className="text-sm text-gray-400 dark:text-gray-400 soft-dark:text-gray-700 light:text-gray-600 orange:text-slate-700 leaf:text-gray-800 water:text-gray-800 mb-8">
            Effective and last updated: August 3, 2026
          </p>

          <div className="border-l-4 border-cyan-400 light:border-green-700 orange:border-orange-800 leaf:border-sky-900 water:border-lime-900 bg-white/5 light:bg-white/70 orange:bg-white/30 leaf:bg-white/20 water:bg-white/30 px-6 py-5 mb-12 text-gray-200 dark:text-gray-200 soft-dark:text-gray-700 light:text-gray-700 orange:text-slate-700 leaf:text-gray-800 water:text-gray-800 leading-relaxed">
            Epic Global Inc. (&quot;Epic Global,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects privacy and is committed to protecting and handling personal information responsibly. This Policy explains how we collect, use, disclose, retain, and protect personal information when you visit our websites, use products or services that link to this Policy, communicate with us, or authorize a connection to a third-party platform or service.
          </div>

          <div className="prose prose-invert max-w-none">
            <div className="space-y-10 text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-slate-700 leaf:text-gray-800 water:text-gray-800 leading-relaxed">
              <p>
                This Policy describes our general practices. A contract, data processing addendum, product-specific notice, or authorization screen may provide additional or more specific terms. If we process personal information solely on behalf of a business customer, that customer controls the information and its instructions govern our processing.
              </p>

              <PolicySection number={1} title="Scope">
                <p>This Policy applies to:</p>
                <BulletList>
                  <li>our corporate website at epicglobalinc.com and related pages or subdomains that link to this Policy;</li>
                  <li>Epic Global software products, customer portals, and business services that link to this Policy;</li>
                  <li>marketplace, ecommerce, advertising, analytics, asset-management, and operational services we provide;</li>
                  <li>integrations that a customer or authorized user connects to our services, including marketplaces, social and advertising platforms, identity providers, accounting systems, human-resources systems, and other business applications;</li>
                  <li>job applicants, candidates, contractors, and others who participate in recruiting or employment-related processes; and</li>
                  <li>communications, support requests, assessments, events, and other interactions with Epic Global.</li>
                </BulletList>
                <p>This Policy does not govern a third party&apos;s independent privacy practices. Third-party services remain subject to their own privacy policies and terms.</p>
              </PolicySection>

              <PolicySection number={2} title="Personal Information We Collect">
                <p>The information we collect depends on how you interact with us and which services or integrations you use.</p>
                <h3 className="text-xl font-semibold text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900">Information you provide</h3>
                <BulletList>
                  <li><strong>Contact and identity information:</strong> name, business email address, telephone number, job title, company, account identifiers, and authentication or profile information.</li>
                  <li><strong>Business and operational information:</strong> marketplace accounts, catalogs, SKUs, listings, inventory, pricing, advertising, forecasts, budgets, approvals, assets, software subscriptions, vendors, contracts, and other information submitted for an assessment or service.</li>
                  <li><strong>Transaction and billing information:</strong> billing contact details, plan or entitlement information, invoices, payment status, and transaction records. Payment-card details may be collected directly by a payment processor rather than by Epic Global.</li>
                  <li><strong>Communications:</strong> messages, meeting information, support requests, survey responses, and records of correspondence.</li>
                  <li><strong>Applicant and recruiting information:</strong> resumes, employment and education history, professional qualifications, references, work-authorization information, compensation expectations, interview notes, and other information provided during a recruiting process.</li>
                  <li><strong>Files and content:</strong> documents, images, product information, creative materials, reports, or other content you choose to upload or provide.</li>
                </BulletList>
                <p>Please do not provide sensitive personal information unless it is necessary for an authorized business purpose and you have the right to provide it.</p>

                <h3 className="text-xl font-semibold text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900">Information from connected platforms and APIs</h3>
                <p>When an authorized user connects a third-party account, we may receive information allowed by that platform and by the permissions selected by the user, including:</p>
                <BulletList>
                  <li>platform account identifiers, profile information, business or shop information, and authorized-user details;</li>
                  <li>product catalogs, listings, inventory, pricing, orders, returns, shipping or fulfillment information, and customer-service information;</li>
                  <li>advertising accounts, campaigns, spend, performance, audience or attribution metrics, and reporting data;</li>
                  <li>content, post or video metadata, engagement and performance metrics, comments or interaction settings, and publishing status;</li>
                  <li>access tokens, refresh tokens, authorization scopes, token expiration information, webhook events, and integration logs; and</li>
                  <li>other information specifically described on the authorization screen or in applicable product documentation.</li>
                </BulletList>
                <p>The exact information received is limited by the third-party permissions granted and the features enabled.</p>

                <h3 className="text-xl font-semibold text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900">Information collected automatically</h3>
                <BulletList>
                  <li>IP address, browser type, device type, operating system, language, and approximate location derived from IP address;</li>
                  <li>pages, features, links, and content viewed; timestamps; referring pages; campaign parameters; and interactions with forms or calls to action;</li>
                  <li>session identifiers, account activity, audit events, error logs, and security events; and</li>
                  <li>cookie, pixel, local-storage, and similar technology identifiers.</li>
                </BulletList>
              </PolicySection>

              <PolicySection number={3} title="Sources of Personal Information">
                <p>We may collect personal information:</p>
                <BulletList>
                  <li>directly from you;</li>
                  <li>from your employer, customer, account administrator, or another authorized user;</li>
                  <li>from platforms and applications you authorize us to connect to;</li>
                  <li>from service providers, business partners, and public business sources; and</li>
                  <li>automatically through our websites, software, logs, cookies, pixels, and similar technologies.</li>
                </BulletList>
              </PolicySection>

              <PolicySection number={4} title="How We Use Personal Information">
                <p>We use personal information to:</p>
                <BulletList>
                  <li>provide, configure, secure, support, and improve our websites, software, integrations, and services;</li>
                  <li>authenticate users, manage accounts and workspaces, enforce permissions, and maintain audit records;</li>
                  <li>operate authorized marketplace, ecommerce, content, advertising, analytics, asset, procurement, finance, and workflow functions;</li>
                  <li>synchronize data, prepare reports and recommendations, monitor performance, and automate requested business processes;</li>
                  <li>process transactions, administer plans and entitlements, and maintain business and financial records;</li>
                  <li>communicate about services, respond to requests, schedule meetings, deliver notices, and provide customer support;</li>
                  <li>measure website and campaign performance and improve our marketing and customer experience;</li>
                  <li>detect, investigate, and prevent fraud, abuse, security incidents, and violations of law or contract;</li>
                  <li>comply with legal obligations, resolve disputes, enforce agreements, and protect rights and safety; and</li>
                  <li>create aggregated or deidentified information that does not reasonably identify an individual.</li>
                </BulletList>
                <p>We do not use personal information for materially different purposes without providing appropriate notice or obtaining consent when required.</p>
                <p>We may use automated tools to generate analyses, recommendations, classifications, or workflow suggestions. We do not use solely automated processing to make decisions that produce legal or similarly significant effects about an individual without meaningful human review.</p>
              </PolicySection>

              <PolicySection number={5} title="Connected Platforms and API Integrations">
                <p>If you or your organization authorize an Epic Global service to connect with a third-party platform, application, or API, the following additional terms apply to information received through that connection (&quot;Integration Data&quot;):</p>
                <BulletList>
                  <li><strong>Authorization and scope:</strong> We access Integration Data only after an authorized user or business customer enables the connection. The information available to us depends on the products, scopes, permissions, account settings, and instructions approved for that integration.</li>
                  <li><strong>Types of Integration Data:</strong> Depending on the integration, Integration Data may include account and user identifiers, profile or workspace information, business or shop information, catalog and product data, order and fulfillment data, content or media metadata, engagement and performance metrics, advertising or commerce information, accounting or transaction records, identity or employment information, authorization tokens, and integration logs.</li>
                  <li><strong>Purposes:</strong> We use Integration Data to provide the requested connection and related services, such as account linking, data synchronization, marketplace or catalog operations, content publishing, identity and access management, usage analysis, reporting, reconciliation, customer support, security, and troubleshooting.</li>
                  <li><strong>User choice and authorized actions:</strong> We honor applicable permissions, account settings, privacy options, and provider restrictions. We do not publish content, change third-party records, or perform account actions unless initiated or authorized through the applicable service workflow.</li>
                  <li><strong>Sharing:</strong> We do not sell Integration Data. We disclose Integration Data only to the authorized customer, to service providers that help us deliver the integration under appropriate obligations, when directed by an authorized user, or when legally required. Additional provider-specific restrictions may apply.</li>
                  <li><strong>Tokens and security:</strong> Access tokens, refresh tokens, API keys, and similar credentials are treated as confidential, protected using reasonable safeguards, and used only for authorized requests.</li>
                  <li><strong>Retention and revocation:</strong> We retain Integration Data only for as long as reasonably necessary to provide the authorized service, meet legal obligations, resolve disputes, or maintain security and audit records. An authorized user may revoke access through the connected provider or request disconnection from Epic Global. Following revocation or a verified deletion request, we delete or deidentify Integration Data that is no longer required, subject to legal obligations, fraud-prevention needs, and limited backup cycles.</li>
                  <li><strong>AI-assisted features and model training:</strong> We may use vetted artificial-intelligence service providers to process Integration Data or customer content only to perform a customer-requested feature. We do not use, or permit those providers to use, Integration Data, customer content, uploaded files, or personal information to develop, train, or improve generalized or foundation artificial-intelligence or machine-learning models.</li>
                </BulletList>
                <p>Each connected provider processes information under its own privacy policy, terms, and platform rules. Epic Global is not responsible for a provider&apos;s independent practices.</p>
                <p>Our use and transfer to any other application of information received from Google APIs adheres to the Google API Services User Data Policy, including the Limited Use requirements. We do not use Google user data for advertising, credit decisions, or generalized model training.</p>
              </PolicySection>

              <PolicySection number={6} title="Legal Bases for Processing">
                <p>Where applicable law requires a legal basis, we process personal information based on contract, legitimate interests, consent, legal obligations, or the need to establish, exercise, or defend legal claims and protect people, property, and systems.</p>
                <p>You may withdraw consent where processing relies on consent. Withdrawal does not affect processing that occurred before withdrawal.</p>
              </PolicySection>

              <PolicySection number={7} title="How We Disclose Personal Information">
                <p>We may disclose personal information to:</p>
                <BulletList>
                  <li><strong>service providers and processors</strong> that provide hosting, cloud infrastructure, analytics, advertising measurement, customer relationship management, communications, payment processing, security, file storage, identity, support, and professional services;</li>
                  <li><strong>connected platforms and business partners</strong> when necessary to complete an authorized integration or provide requested services;</li>
                  <li><strong>your organization and authorized users</strong> according to workspace membership, roles, permissions, and customer instructions;</li>
                  <li><strong>professional advisers</strong> such as attorneys, accountants, auditors, insurers, and consultants;</li>
                  <li><strong>government authorities or other parties</strong> when required by law or reasonably necessary to protect rights, safety, systems, users, or the public; and</li>
                  <li><strong>transaction participants</strong> in connection with a merger, acquisition, financing, reorganization, bankruptcy, sale of assets, or similar transaction, subject to appropriate protections.</li>
                </BulletList>
                <p>Our website and services may use providers such as Amazon Web Services, Google Analytics and Google Ads, Meta Pixel, LinkedIn Insight, customer relationship management and sales systems such as HubSpot, Cloudflare security services, email and notification providers, identity providers, and other vendors appropriate to the enabled services. Providers may change as our systems evolve.</p>
              </PolicySection>

              <PolicySection number={8} title="Sales, Sharing, and Targeted Advertising">
                <p>We do not sell personal information. We use advertising services that may receive online identifiers, device information, approximate location, and website interaction data to measure campaigns and present advertising across websites or services. Applicable law may define these disclosures as &quot;sharing&quot; or processing for &quot;targeted advertising.&quot;</p>
                <p>You may opt out of sale, sharing, and targeted advertising through <a href="/privacy-choices" className={policyLinkClassName}>Your Privacy Choices</a>, by using Global Privacy Control, or by emailing <a href={`mailto:${siteConfig.privacyEmail}`} className={policyLinkClassName}>{siteConfig.privacyEmail}</a>. We recognize legally required browser-based opt-out preference signals for the browser or device sending the signal and, where required by applicable law, any associated consumer profile or account known to us. We do not knowingly sell or share the personal information of individuals under 18, and we do not sell sensitive personal information.</p>
              </PolicySection>

              <PolicySection number={9} title="Cookies and Similar Technologies">
                <p>We use cookies, pixels, local storage, session storage, and similar technologies for essential operation, authentication, security, preferences, analytics, performance measurement, error diagnosis, lead attribution, advertising measurement, and conversion reporting.</p>
                <p>Essential technologies support security, authentication, requested forms, fraud prevention, preferences, and core website operation. We do not load optional Google Analytics and Ads, Meta Pixel, or LinkedIn Insight tracking until a visitor allows analytics and advertising technologies. A visitor may reject those technologies, change the choice through <a href="/privacy-choices" className={policyLinkClassName}>Your Privacy Choices</a>, or use Global Privacy Control. The saved website choice generally remains in that browser for one year.</p>
              </PolicySection>

              <PolicySection number={10} title="Data Retention">
                <p>Unless a contract, legal obligation, litigation hold, or product-specific notice requires a different period, our general retention schedule is:</p>
                <BulletList>
                  <li><strong>Customer accounts, workspace administration, and contract records:</strong> for the customer relationship and up to seven years afterward.</li>
                  <li><strong>Billing, transaction, tax, and accounting records:</strong> seven years from the applicable transaction or reporting period.</li>
                  <li><strong>Customer content and Integration Data:</strong> while the account or authorized connection remains active. After termination, disconnection, or a verified deletion request, active-system data is deleted or deidentified within 30 days unless the customer contract specifies a different period; protected backup copies expire within 90 days.</li>
                  <li><strong>Security, access, and audit records:</strong> generally one to ten years, depending on the service, customer configuration, investigation needs, and contractual or compliance requirements.</li>
                  <li><strong>Support records:</strong> three years after the support matter closes.</li>
                  <li><strong>Marketing and business-development records:</strong> until opt-out or two years after the last meaningful interaction, whichever occurs first, except for suppression records.</li>
                  <li><strong>Applicant and recruiting records:</strong> two years after the applicable recruiting process, unless law requires a different period.</li>
                </BulletList>
                <p>When information is no longer required, we delete, deidentify, or securely isolate it. We maintain limited suppression records when necessary to honor opt-outs and prevent unwanted re-enrollment.</p>
              </PolicySection>

              <PolicySection number={11} title="Data Security">
                <p>We maintain administrative, technical, and physical safeguards designed to protect personal information. Depending on the service, safeguards may include access controls, role-based permissions, encryption in transit and at rest, audit logging, credential and secret management, network protections, backups, monitoring, vulnerability remediation, and incident-response procedures.</p>
                <p>No system can be guaranteed completely secure. You are responsible for protecting your credentials and promptly notifying us of suspected unauthorized access.</p>
              </PolicySection>

              <PolicySection number={12} title="International Data Transfers">
                <p>Epic Global is based in the United States and may process information in the United States and other countries where we or our service providers operate. Those countries may have privacy laws different from the laws where you live.</p>
                <p>For restricted transfers from the European Economic Area, we use the European Commission&apos;s Standard Contractual Clauses where required, together with transfer assessments and supplementary safeguards appropriate to the transfer. For restricted transfers from the United Kingdom, we use the United Kingdom International Data Transfer Agreement or the UK Addendum to the EU Standard Contractual Clauses where required. We may rely on an applicable adequacy decision or another lawful transfer mechanism when available. You may request information about the relevant safeguard by emailing <a href={`mailto:${siteConfig.privacyEmail}`} className={policyLinkClassName}>{siteConfig.privacyEmail}</a>.</p>
              </PolicySection>

              <PolicySection number={13} title="Your Privacy Rights">
                <p>Depending on your location and subject to applicable exceptions, you may have the right to:</p>
                <BulletList>
                  <li>request access to or a copy of personal information;</li>
                  <li>request correction of inaccurate personal information;</li>
                  <li>request deletion of personal information;</li>
                  <li>request restriction of or object to certain processing;</li>
                  <li>receive certain information in a portable format;</li>
                  <li>withdraw consent;</li>
                  <li>opt out of certain sales, sharing, targeted advertising, or profiling;</li>
                  <li>appeal a denial of a privacy request where applicable; and</li>
                  <li>lodge a complaint with a data-protection authority.</li>
                </BulletList>
                <p>To submit a request, email <a href={`mailto:${siteConfig.privacyEmail}?subject=Privacy%20Request`} className={policyLinkClassName}>{siteConfig.privacyEmail}</a> with the subject line &quot;Privacy Request.&quot; We may need to verify your identity and authority before completing a request.</p>
                <p>We respond within the time required by applicable law, generally within 45 days under applicable U.S. state privacy laws and within one month under European Economic Area or United Kingdom data-protection law. If law permits an extension, we will notify you and explain the reason.</p>
                <p>If we deny a request, our response will explain the basis and any appeal right. Where an appeal is available, reply to the denial or email <a href={`mailto:${siteConfig.privacyEmail}?subject=Privacy%20Appeal`} className={policyLinkClassName}>{siteConfig.privacyEmail}</a> with the subject line &quot;Privacy Appeal.&quot; A person who was not responsible for the original denial will review the appeal.</p>
                <p>If Epic Global processes information solely on behalf of your employer or another business customer, please direct your request to that organization first. We will assist the customer as required by our agreement and applicable law. We will not discriminate against you for exercising applicable privacy rights.</p>
              </PolicySection>

              <PolicySection number={14} title="United States State Privacy Disclosures">
                <p>During the preceding 12 months, we may have collected identifiers and contact information; customer and commercial records; internet, device, and network activity; approximate geolocation; professional or employment-related information; user-provided content; account credentials; financial information used for authorized business functions; and inferences derived from business or usage information.</p>
                <p>We use these categories for the operational, security, support, analytics, advertising, transaction, integration, and legal purposes described in Section 4 and disclose them to the recipients described in Section 7. We do not sell personal information. We may share online identifiers, device and network activity, approximate location, and website interaction data with advertising and analytics providers for targeted advertising as described in Section 8.</p>
                <p>We process sensitive personal information only for permitted operational, security, legal, or customer-directed purposes. We do not sell sensitive personal information or use it to infer characteristics about an individual. We limit collection, use, and retention to information reasonably necessary and proportionate to the disclosed purpose.</p>
                <p>Applicable state residents may exercise the rights described in Section 13 and opt out through <a href="/privacy-choices" className={policyLinkClassName}>Your Privacy Choices</a>, Global Privacy Control, or <a href={`mailto:${siteConfig.privacyEmail}`} className={policyLinkClassName}>{siteConfig.privacyEmail}</a>. We do not use personal information to make solely automated decisions that produce legal or similarly significant effects without meaningful human review.</p>
              </PolicySection>

              <PolicySection number={15} title="Children's Privacy">
                <p>Our websites, software, and business services are not directed to children under 18, and we do not knowingly collect personal information from children. If you believe a child has provided personal information to us, contact us so we can investigate and take appropriate action.</p>
              </PolicySection>

              <PolicySection number={16} title="Third-Party Websites and Services">
                <p>Our services may link to or integrate with third-party websites and services. Their privacy practices are governed by their own notices and agreements. Review those policies before providing information or authorizing a connection.</p>
              </PolicySection>

              <PolicySection number={17} title="Changes to This Policy">
                <p>We may update this Policy to reflect changes in our services, data practices, providers, or legal requirements. We will post the updated Policy and revise the &quot;Last updated&quot; date. When required, we will provide additional notice or obtain consent for material changes.</p>
              </PolicySection>

              <PolicySection number={18} title="Contact Us">
                <p>Questions, concerns, or privacy requests may be directed to:</p>
                <address className="not-italic border-l-4 border-cyan-400 light:border-green-700 orange:border-orange-800 leaf:border-sky-900 water:border-lime-900 pl-5 text-gray-200 dark:text-gray-200 soft-dark:text-gray-700 light:text-gray-700 orange:text-slate-700 leaf:text-gray-800 water:text-gray-800">
                  <strong>Epic Global Inc.</strong><br />
                  Attn: Privacy<br />
                  {siteConfig.streetAddress}<br />
                  {siteConfig.locality}, {siteConfig.region} {siteConfig.postalCode}<br />
                  United States<br />
                  Email: <a href={`mailto:${siteConfig.privacyEmail}?subject=Privacy%20Request`} className={policyLinkClassName}>{siteConfig.privacyEmail}</a><br />
                  Website: <a href={siteConfig.url} className={policyLinkClassName}>epicglobalinc.com</a>
                </address>
                <p>When contacting us about a privacy right, use the subject line &quot;Privacy Request.&quot;</p>
              </PolicySection>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
