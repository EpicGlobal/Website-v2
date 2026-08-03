import { siteConfig } from '@/site/site-config';

const sectionHeadingClassName =
  'text-2xl font-semibold text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900 mb-4';

export function Terms() {
  return (
    <div className="min-h-screen text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-gray-900 leaf:text-gray-900 water:text-gray-900 bg-gradient-to-br dark:from-cyan-950 dark:via-slate-900 dark:to-black soft-dark:from-lime-400 soft-dark:via-lime-100 soft-dark:to-white leaf:from-[#00A8EA] leaf:via-cyan-100 leaf:to-white water:from-lime-500 water:via-lime-100 water:to-white orange:from-[#F68932] orange:via-orange-100 orange:to-white">
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-white dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-gray-900">
            Terms of Service
          </h1>
          <p className="text-sm text-gray-400 dark:text-gray-400 soft-dark:text-gray-700 light:text-gray-600 orange:text-slate-700 leaf:text-gray-800 water:text-gray-800 mb-12">
            Last updated: January 14, 2026
          </p>

          <div className="prose prose-invert max-w-none">
            <div className="space-y-8 text-gray-300 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-slate-700 leaf:text-gray-800 water:text-gray-800 leading-relaxed">
              <section>
                <h2 className={sectionHeadingClassName}>1. Agreement to Terms</h2>
                <p>
                  By accessing or using the Epic Global Inc. website and services (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Services.
                </p>
              </section>

              <section>
                <h2 className={sectionHeadingClassName}>2. Description of Services</h2>
                <p>
                  Epic Global Inc. provides global eCommerce marketplace operations, including but not limited to inventory purchasing, marketplace management, global expansion, advertising operations, brand protection, and related services. Specific service terms are defined in individual engagement agreements.
                </p>
              </section>

              <section>
                <h2 className={sectionHeadingClassName}>3. Eligibility</h2>
                <p>
                  Our Services are intended for businesses and organizations. By using our Services, you represent and warrant that you have the authority to bind your organization to these Terms and any engagement agreements.
                </p>
              </section>

              <section>
                <h2 className={sectionHeadingClassName}>4. Use of Services</h2>
                <p className="mb-3">You agree to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate, current, and complete information during assessment and throughout our engagement</li>
                  <li>Maintain the security and confidentiality of your account credentials</li>
                  <li>Use our Services only for lawful purposes and in accordance with these Terms</li>
                  <li>Not interfere with or disrupt the integrity or performance of our Services</li>
                </ul>
              </section>

              <section>
                <h2 className={sectionHeadingClassName}>5. Intellectual Property</h2>
                <p className="mb-3">
                  All content, features, and functionality of our Services, including but not limited to text, graphics, logos, software, and methodologies, are the exclusive property of Epic Global Inc. and are protected by copyright, trademark, and other intellectual property laws.
                </p>
                <p>
                  You are granted a limited, non-exclusive, non-transferable license to access and use our Services for your business purposes, subject to these Terms.
                </p>
              </section>

              <section>
                <h2 className={sectionHeadingClassName}>6. Client Data and Confidentiality</h2>
                <p className="mb-3">
                  We treat all client data, business information, and operational details as confidential. We implement appropriate measures to protect this information and will not disclose it to third parties except as necessary to provide Services or as required by law.
                </p>
                <p>
                  You retain all rights to your product data, brand assets, and proprietary information shared with us. We use this information solely to provide and improve our Services.
                </p>
              </section>

              <section>
                <h2 className={sectionHeadingClassName}>7. Service Level and Warranties</h2>
                <p className="mb-3">
                  While we strive to provide high-quality services and reliable operations, our Services are provided "as is" and "as available" without warranties of any kind, either express or implied.
                </p>
                <p>
                  We do not guarantee specific performance outcomes, revenue targets, or marketplace rankings. Marketplace performance depends on numerous factors beyond our control, including marketplace algorithms, competition, and market conditions.
                </p>
              </section>

              <section>
                <h2 className={sectionHeadingClassName}>8. Limitation of Liability</h2>
                <p>
                  To the maximum extent permitted by law, Epic Global Inc. shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities, arising from your use of our Services.
                </p>
              </section>

              <section>
                <h2 className={sectionHeadingClassName}>9. Indemnification</h2>
                <p>
                  You agree to indemnify and hold harmless Epic Global Inc., its officers, employees, and agents from any claims, damages, losses, or expenses arising from your use of our Services, violation of these Terms, or violation of any third-party rights.
                </p>
              </section>

              <section>
                <h2 className={sectionHeadingClassName}>10. Term and Termination</h2>
                <p className="mb-3">
                  These Terms remain in effect while you use our Services. Specific engagement terms, including duration and termination provisions, are defined in individual service agreements.
                </p>
                <p>
                  We reserve the right to suspend or terminate access to our Services at any time for violation of these Terms or for any other reason at our discretion.
                </p>
              </section>

              <section>
                <h2 className={sectionHeadingClassName}>11. Modifications to Terms</h2>
                <p>
                  We reserve the right to modify these Terms at any time. We will provide notice of material changes by posting the updated Terms on our website and updating the "Last updated" date. Continued use of our Services after changes constitutes acceptance of the modified Terms.
                </p>
              </section>

              <section>
                <h2 className={sectionHeadingClassName}>12. Governing Law</h2>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Epic Global Inc. is registered, without regard to conflict of law principles.
                </p>
              </section>

              <section>
                <h2 className={sectionHeadingClassName}>13. Dispute Resolution</h2>
                <p>
                  Any disputes arising from these Terms or our Services shall be resolved through good-faith negotiations. If negotiations fail, disputes may be submitted to binding arbitration or resolved in the courts of our registered jurisdiction, as specified in individual engagement agreements.
                </p>
              </section>

              <section>
                <h2 className={sectionHeadingClassName}>14. Severability</h2>
                <p>
                  If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
                </p>
              </section>

              <section>
                <h2 className={sectionHeadingClassName}>15. Entire Agreement</h2>
                <p>
                  These Terms, together with any specific engagement agreements, constitute the entire agreement between you and Epic Global Inc. regarding the use of our Services and supersede all prior agreements and understandings.
                </p>
              </section>

              <section>
                <h2 className={sectionHeadingClassName}>16. Contact Information</h2>
                <p className="mb-3">
                  If you have questions about these Terms, please contact us at:
                </p>
                <div className="bg-white/5 light:bg-white/70 orange:bg-white/30 leaf:bg-white/20 water:bg-white/30 rounded-lg p-6 border border-white/10 light:border-gray-200 orange:border-orange-900/10 leaf:border-sky-900/10 water:border-lime-900/10">
                  <p><strong>Epic Global Inc.</strong></p>
                  <p className="text-gray-400 dark:text-gray-400 soft-dark:text-gray-700 light:text-gray-600 orange:text-slate-700 leaf:text-gray-800 water:text-gray-800 mt-2">Email: {siteConfig.legalEmail}</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
