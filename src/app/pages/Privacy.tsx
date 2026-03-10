import { siteConfig } from '@/site/site-config';

export function Privacy() {
  return (
    <div className="min-h-screen text-white">
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-white">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-400 mb-12">
            Last updated: January 14, 2026
          </p>

          <div className="prose prose-invert max-w-none">
            <div className="space-y-8 text-gray-300 leading-relaxed">
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
                <p>
                  Epic Global Inc. ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
                <p className="mb-3">We may collect information about you in a variety of ways, including:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Personal Data:</strong> Name, email address, company name, phone number, and other contact information you provide when requesting an assessment or contacting us.</li>
                  <li><strong>Business Information:</strong> Information about your business operations, SKU catalogs, marketplace performance, and related operational data shared during our assessment and engagement.</li>
                  <li><strong>Usage Data:</strong> Information about how you access and use our website, including your IP address, browser type, pages visited, and time spent on pages.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
                <p className="mb-3">We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Assess fit and provide marketplace operating services</li>
                  <li>Communicate with you about our services and respond to inquiries</li>
                  <li>Improve our website, services, and customer experience</li>
                  <li>Monitor and analyze usage patterns and trends</li>
                  <li>Protect against fraudulent or illegal activity</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">4. Disclosure of Your Information</h2>
                <p className="mb-3">We may share your information in the following situations:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Service Providers:</strong> We may share information with third-party vendors who perform services on our behalf, subject to confidentiality obligations.</li>
                  <li><strong>Business Transfers:</strong> In connection with any merger, sale of company assets, financing, or acquisition of all or a portion of our business.</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights, property, or safety.</li>
                </ul>
                <p className="mt-3">
                  We do not sell, trade, or rent your personal information to third parties for marketing purposes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">5. Data Security</h2>
                <p>
                  We implement appropriate technical and organizational security measures to protect your information. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">6. Data Retention</h2>
                <p>
                  We retain your information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">7. Your Rights</h2>
                <p className="mb-3">Depending on your location, you may have certain rights regarding your personal information, including:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>The right to access and receive a copy of your personal information</li>
                  <li>The right to request correction of inaccurate information</li>
                  <li>The right to request deletion of your information</li>
                  <li>The right to object to or restrict certain processing activities</li>
                </ul>
                <p className="mt-3">
                  To exercise these rights, please contact us using the information below.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">8. Third-Party Websites</h2>
                <p>
                  Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review their privacy policies.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">9. Children's Privacy</h2>
                <p>
                  Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">10. Changes to This Privacy Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">11. Contact Us</h2>
                <p className="mb-3">
                  If you have questions or concerns about this Privacy Policy or our data practices, please contact us at:
                </p>
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <p><strong>Epic Global Inc.</strong></p>
                  <p className="text-gray-400 mt-2">Email: {siteConfig.privacyEmail}</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
