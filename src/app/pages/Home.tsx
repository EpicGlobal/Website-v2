'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Globe2, Search, BarChart3, Package, Shield, Database, Cpu, ArrowRight, Sparkles } from 'lucide-react';
import { Globe } from '@/app/components/Globe';
import { TrustLogosMarquee } from '@/app/components/TrustLogosMarquee';
import { ParticlesBackground } from '@/app/components/ParticlesBackground';
import { StructuredData, founderSchema, getWebPageSchema, organizationSchema, serviceSchemas, websiteSchema } from '@/app/components/StructuredData';
import { SEO } from '@/app/components/SEO';
import { CtaButton } from '@/app/components/CtaButton';
import { motion } from 'framer-motion';
import { useAnalytics } from '@/hooks/useAnalytics';
import activationLogo from '@/assets/11ff501713732b442477ea6dc6d2ee5695107009.png';
import ageLOCLogo from '@/assets/5cef0eca7ed4e33201516cb198f51116d8fc8260.png';
import ap24Logo from '@/assets/e0b5aa7b1a7ae0ea4d602bfa40a1f28c69508679.png';
import ambrGroupLogo from '@/assets/9d7ed059f58ee9d2d6939faeeaab4f60c3c7ee67.png';
import bonaBotanicaLogo from '@/assets/0c3cf0d40d92c09708e347151b005f3e5596072d.png';
import buckedUpLogo from '@/assets/43335a8bbd39ae86c6992eb00ce2751179d44ceb.png';
import beautyFocusLogo from '@/assets/16be2a2697022ec318fc5dffab604ec08c6ea110.png';
import botalabLogo from '@/assets/22e8e47e93878bd055f3f0784ad51324a14e2e86.png';
import best365labsLogo from '@/assets/8b0023dfd087e303de5c3c4b7e64172be3500fac.png';
import bodeProLogo from '@/assets/dd52d621b52abc573986f37f46a1c4defdf9e2e1.png';
import epochLogo from '@/assets/1a51400c847b43ceb652f7b37844917910e49662.png';
import doctorsBestLogo from '@/assets/986dd0a0a85aa440a5b4d8924b7bdef2acd069ce.png';
import essenceLogo from '@/assets/a92d4950f8b8bdbc951d148f881551d55c5c0a24.png';
import cronkNutrientsLogo from '@/assets/ba0e3491f303ef8e07257a25c46835bd5dba4666.png';
import gentlemenRepublicLogo from '@/assets/41f6e55df1fa2c29fdc640f9ef5481334f819ad5.png';
import h2oCardioLogo from '@/assets/6e83860a8e1e07bf9143171faaa89952db9fd600.png';
import iceElementsLogo from '@/assets/398340e50590d80a267db4420b16873a69c96d3c.png';
import incelldermLogo from '@/assets/d7d83b3aba9e9324d0971b91c01187787a9373d2.png';
import lifeningLogo from '@/assets/7050cfcd254a8e6b35a5e7eae127ccf0431d032f.png';
import healthyHomeLogo from '@/assets/c0c4994bde7fe0a435eabb1839c2db5ae0216b51.png';
import heroineMakeLogo from '@/assets/ba0e3491f303ef8e07257a25c46835bd5dba4666.png';
import kLogo from '@/assets/89a47228c49eea9be03629d307026d29fb10245d.png';
import kingsLogo from '@/assets/ddb35a678bf18d6c48db81488df2c1a687976f18.png';
import honeLogo from '@/assets/dc197f19a00425da10530730027f754cd7d825da.png';
import lifeCiderLogo from '@/assets/55a30c6511b44c8a17c8aff06f5280397091adc5.png';
import makeWellnessLogo from '@/assets/0fd1df88bd92404824795387f70ccee691cd1b04.png';
import novexBiotechLogo from '@/assets/4fd949eb8c616f3359384cec575169ba872f082a.png';
import muscleMooseLogo from '@/assets/911cd3b70129bc626e8a2e32e49c28ce2d0780a8.png';
import midisemLogo from '@/assets/d5bd0fe2ac7d6d0378bc37edf5c072031109480f.png';
import lionStrikeLogo from '@/assets/b818b6f69f5a38c79a1acd6f6d4fc30300fe8a4a.png';
import neumiLogo from '@/assets/80f32a538c28c693808c45eac479be8b6e62adc9.png';
import mixhersLogo from '@/assets/81018778351755f2626aa9ec670f8c62da761311.png';
import madeLogo from '@/assets/96fbb37ae09cd392e4834ec967b0824a22cbedab.png';
import livePureLogo from '@/assets/eef3afdcff3f4eee2911c341c057822192f87ebe.png';
import nowLogo from '@/assets/b4b898dbe9fdbd902dfe9ec3cb4013399a7a6fcb.png';
import phoneSoapLogo from '@/assets/926eb7b011c9ced870fb1fa1a10dc4e82df9fa85.png';
import radiansomeLogo from '@/assets/952b70825f76279daf633b749f52f1eeb7305689.png';
import perfectPressLogo from '@/assets/012ff1bc223010a71f1ed759ebf1618f606042a4.png';
import plexusLogo from '@/assets/56a41e768ec1c8cf98a6c6962f504e0a3e5dba67.png';
import pureFuelLogo from '@/assets/d67ca1954efd70528ba0a525762f054428302858.png';
import pharmanexLogo from '@/assets/21fb64a9aee9200a3ba0b9e6615bba9e7b4d4c5a.png';
import rimanLogo from '@/assets/bf61859afc82053a96f8ade2ed15258358dd8cf8.png';
import nutricientialsLogo from '@/assets/6210ed77610d27a5f3abdd2bbc3872b72b4a11df.png';
import organoLogo from '@/assets/e1a2b5126b39c8bafb6e331307cdb83cf21fe64e.png';
import nuSkinLogo from '@/assets/5f1a49c0a0b32f372b4ee6beb26a48631d147029.png';
import seroVitalLogo from '@/assets/1f4eed43c7961e335dc19e64a0f05334073cd6e2.png';
import suteraLogo from '@/assets/967c8426adebcc2a86cafe0b4d49f813b966b007.png';
import thriveLogo from '@/assets/6ad188b6a295f7b6d96be106d8d12fdd6566ebdd.png';
import tranontLogo from '@/assets/3efbc93baa925523f1affbf3643d8d528af7d0d7.png';
import simmtronicsLogo from '@/assets/9ca3201fd54a521494c7b90bc2f6e0221727094f.png';
import thinkSmarterProductsLogo from '@/assets/b1e2ea523335f184b5f55c9775f5ada284f6b125.png';
import truvyLogo from '@/assets/3197f3ef0c1a8b4d9a4dc10ca2db8bc2093cc26f.png';
import reuzelLogo from '@/assets/883f18fa753a7106216503ca3c6ef72d1178fcf1.png';
import relacoreLogo from '@/assets/960c114fb5ef207b865b392e3414a92fa2a538e7.png';
import rfLogo from '@/assets/7df4db1a84b40fbea8116e0deab0bac19dd891bf.png';
import youniqueLogo from '@/assets/7762de3ef51cb8cc05069238ad5ebc05c432ec99.png';
import zantrexLogo from '@/assets/a02203de0f65132ee8277243eb83905610259bc6.png';
import ziveLogo from '@/assets/bac9c727078929bc5f7386af4f562d2fe9fefe30.png';

export function Home() {
  const { trackClick } = useAnalytics();

  const brands = [
    { name: 'ACTIVATION', logo: activationLogo },
    { name: 'ageLOC', logo: ageLOCLogo },
    { name: 'AP 24', logo: ap24Logo },
    { name: 'Ambr Group', logo: ambrGroupLogo },
    { name: 'BONA BOTANICA', logo: bonaBotanicaLogo },
    { name: 'BUCKED UP', logo: buckedUpLogo },
    { name: 'BEAUTY FOCUS', logo: beautyFocusLogo },
    { name: 'botalab', logo: botalabLogo },
    { name: 'best365labs', logo: best365labsLogo },
    { name: 'bode PRO', logo: bodeProLogo },
    { name: 'epoch', logo: epochLogo },
    { name: "Doctor's BEST", logo: doctorsBestLogo },
    { name: 'ESSENCE', logo: essenceLogo },
    { name: 'CRONK NUTRIENTS', logo: cronkNutrientsLogo },
    { name: 'Gentlemen Republic', logo: gentlemenRepublicLogo },
    { name: 'H2O CARDIO', logo: h2oCardioLogo },
    { name: 'ICE ELEMENTS', logo: iceElementsLogo },
    { name: 'INCELLDERM', logo: incelldermLogo },
    { name: 'Lifening', logo: lifeningLogo },
    { name: 'HEALTHY home', logo: healthyHomeLogo },
    { name: 'heroine make', logo: heroineMakeLogo },
    { name: 'K', logo: kLogo },
    { name: 'KINGS', logo: kingsLogo },
    { name: 'hone', logo: honeLogo },
    { name: 'life cider', logo: lifeCiderLogo },
    { name: 'MAKE WELLNESS', logo: makeWellnessLogo },
    { name: 'Novex Biotech', logo: novexBiotechLogo },
    { name: 'MUSCLE MOOSE', logo: muscleMooseLogo },
    { name: 'MIDISEM', logo: midisemLogo },
    { name: 'lionstrike', logo: lionStrikeLogo },
    { name: 'neumi', logo: neumiLogo },
    { name: 'mixhers', logo: mixhersLogo },
    { name: 'made', logo: madeLogo },
    { name: 'Live PURE', logo: livePureLogo },
    { name: 'now', logo: nowLogo },
    { name: 'PHONESOAP', logo: phoneSoapLogo },
    { name: 'RADIANSOME', logo: radiansomeLogo },
    { name: 'PERFECT PRESS', logo: perfectPressLogo },
    { name: 'plexus', logo: plexusLogo },
    { name: 'PURE FUEL', logo: pureFuelLogo },
    { name: 'PHARMANEX', logo: pharmanexLogo },
    { name: 'Riman', logo: rimanLogo },
    { name: 'NUTRICENTIALS', logo: nutricientialsLogo },
    { name: 'ORGANO', logo: organoLogo },
    { name: 'NU SKIN', logo: nuSkinLogo },
    { name: 'SeroVital', logo: seroVitalLogo },
    { name: 'sutera', logo: suteraLogo },
    { name: 'thrive', logo: thriveLogo },
    { name: 'TRANONT', logo: tranontLogo },
    { name: 'Simmtronics', logo: simmtronicsLogo },
    { name: 'Think Smarter Products', logo: thinkSmarterProductsLogo },
    { name: 'Truvy', logo: truvyLogo },
    { name: 'REUZEL', logo: reuzelLogo },
    { name: 'RELACORE', logo: relacoreLogo },
    { name: 'R+F', logo: rfLogo },
    { name: 'Younique', logo: youniqueLogo },
    { name: 'Zantrex', logo: zantrexLogo },
    { name: 'Zive', logo: ziveLogo },
  ];

  const capabilities = [
    {
      icon: ShoppingCart,
      title: 'Marketplace Management',
      description: 'End-to-end operations across Amazon, Walmart, eBay, and international platforms.',
    },
    {
      icon: Globe2,
      title: 'Global Expansion',
      description: 'Repeatable launch system for new marketplaces: account setup, listing deployment, and go-live coordination.',
    },
    {
      icon: Search,
      title: 'Listing Optimization',
      description: 'Title structure, attribute mapping, keyword placement, and conversion-focused creative.',
    },
    {
      icon: BarChart3,
      title: 'Advertising Operations',
      description: 'Campaign architecture, bid management, creative rotation, and performance analysis.',
    },
    {
      icon: Package,
      title: 'Inventory + Forecasting',
      description: 'Demand planning, marketplace allocation, reorder triggers, and inventory health monitoring.',
    },
    {
      icon: Shield,
      title: 'Brand Protection',
      description: 'Unauthorized seller detection, IP enforcement, catalog integrity, and marketplace policy monitoring.',
    },
    {
      icon: Database,
      title: 'Data + Reporting Layer',
      description: 'Unified dashboards, SKU-level attribution, regional performance, and actionable insights.',
    },
    {
      icon: Cpu,
      title: 'Execution Engine',
      description: 'We use internal systems, automation, and bulk operations to keep catalogs clean, changes consistent, and execution fast across marketplaces.',
    },
  ];

  const executionSteps = [
    {
      step: '01',
      title: 'Assess',
      description: 'Intake current state, baseline performance, map SKU catalog, identify quick wins and structural gaps.',
    },
    {
      step: '02',
      title: 'Build the System',
      description: 'Establish rules, workflows, reporting structure, and automation. Set up the repeatable operating model.',
    },
    {
      step: '03',
      title: 'Execute and Iterate',
      description: 'Run weekly operating cadence: listings, ads, inventory, catalog health. Track, refine, and document every cycle.',
    },
    {
      step: '04',
      title: 'Scale Globally',
      description: 'Replicate the proven system across new marketplaces and regions using the same operational framework.',
    },
  ];

  const featuredCases = [
    {
      pillar: 'Purchase',
      title: 'Catalog Rebuild + Conversion Clarity',
      marketplace: 'Amazon US',
      region: 'North America',
      objective: 'Fix fragmented catalog structure and improve listing quality',
      link: '/case-studies#catalog-rebuild',
    },
    {
      pillar: 'Expand',
      title: 'Multi-Market Launch Pipeline',
      marketplace: 'Amazon EU',
      region: 'Europe',
      objective: 'Launch into 5 European markets with streamlined marketplace setup',
      link: '/case-studies#eu-expansion',
    },
    {
      pillar: 'Cover',
      title: 'Advertising Operational Restructure',
      marketplace: 'Amazon + Walmart',
      region: 'North America',
      objective: 'Reorganize ad structure and improve ROAS accountability',
      link: '/case-studies#ad-restructure',
    },
  ];

  const entityFacts = [
    {
      label: 'Company',
      value: 'Epic Global Inc.',
      detail: 'Global marketplace operator and operating platform',
    },
    {
      label: 'Founder',
      value: 'Glen Jensen',
      detail: 'Founder and operator of the Epic model',
    },
    {
      label: 'Headquarters',
      value: 'United States',
      detail: 'Built for North America and international expansion',
    },
    {
      label: 'Business model',
      value: 'Buy, Sell, Advertise, Protect',
      detail: 'Epic buys inventory, operates channels, funds ads, and protects brand equity',
    },
    {
      label: 'Market coverage',
      value: '41 countries',
      detail: 'Coverage claim should stay current and exact across the site',
    },
    {
      label: 'Primary marketplaces',
      value: 'Amazon, Walmart, eBay',
      detail: 'Plus select approved international ecommerce platforms',
    },
  ];

  return (
    <div className="min-h-screen text-white bg-gradient-to-br from-transparent via-transparent to-transparent dark:text-white dark:from-cyan-950 dark:via-slate-900 dark:to-black soft-dark:text-gray-900 soft-dark:from-lime-500 soft-dark:via-lime-100 soft-dark:to-white leaf:text-gray-900 leaf:from-[#00A8EA] leaf:via-cyan-100 leaf:to-white water:text-gray-900 water:from-lime-500 water:via-lime-100 water:to-white light:text-gray-900 light:from-lime-400 light:via-lime-100 light:to-white orange:text-gray-900 orange:from-[#F68932] orange:via-orange-100 orange:to-white">
      <SEO 
        title="Epic Global Inc. - Zero-Risk Global Commerce Operator"
        description="The world's first Zero-Risk Global Commerce Operator. We purchase inventory upfront, operate marketplace storefronts, fund advertising, and protect your brand. Expand to 41 countries risk-free."
        canonicalUrl="https://epicglobalinc.com/"
        keywords="global commerce operator, ecommerce operator, marketplace expansion, amazon FBA, international ecommerce, zero risk ecommerce"
      />
      <StructuredData data={organizationSchema} />
      <StructuredData data={founderSchema} />
      <StructuredData data={websiteSchema} />
      <StructuredData data={getWebPageSchema('Home', 'https://epicglobalinc.com', 'Global marketplace operator and technology platform for end-to-end eCommerce execution')} />
      {serviceSchemas.map((schema) => (
        <StructuredData key={schema['@id']} data={schema} />
      ))}
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated particles background */}
        <ParticlesBackground />
        
        <div className="absolute inset-0 z-0 flex items-center justify-center" style={{ opacity: 0.6 }}>
          <div className="w-full h-full max-w-4xl max-h-[700px] relative">
            <Globe darkerParticles={true} />
          </div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-2 bg-cyan-500/20 soft-dark:bg-cyan-600/30 water:bg-gradient-to-r water:from-emerald-600 water:to-emerald-700 water:text-white water:shadow-lg water:shadow-emerald-500/20 leaf:bg-gradient-to-r leaf:from-sky-600 leaf:to-sky-700 text-cyan-300 dark:text-cyan-300 soft-dark:text-cyan-900 leaf:text-white light:text-cyan-900 orange:bg-gradient-to-r orange:from-orange-600 orange:to-orange-700 orange:text-white orange:shadow-lg orange:shadow-orange-500/20 leaf:shadow-lg leaf:shadow-sky-500/20 rounded-full text-sm font-semibold tracking-wide mb-6"
            >
              THE OPERATING SYSTEM FOR MARKETPLACE COMMERCE
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-white dark:text-white leaf:text-gray-900 water:text-gray-900 light:text-gray-900 orange:text-[#101828] leading-tight"
            >
              We don't help. We replace.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-[rgb(0,0,0)] dark:text-gray-300 soft-dark:text-gray-800 leaf:text-gray-900 water:text-[#101828] light:text-gray-700 orange:text-[#101828] mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Epic Global Inc. is the world's first <strong className="text-white dark:text-white soft-dark:text-gray-900 water:text-[#101828] orange:text-[#101828]">Zero-Risk Global Commerce Operator</strong>. We replace marketplace complexity with infrastructure. Purchase inventory. Operate storefronts. Fund advertising. Protect brand equity. You carry zero risk. Zero operational burden.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
            >
              <CtaButton variant="primary" size="lg" location="Hero Section" />
              <Link
                href="/case-studies"
                onClick={() => trackClick('View Case Studies', 'CTA Button', { location: 'Hero Section' })}
                className="px-8 py-3.5 bg-white/10 dark:bg-white/10 soft-dark:bg-white/70 leaf:bg-white/70 water:bg-white/70 light:bg-white/10 orange:bg-white/70 text-[rgb(0,0,0)] dark:text-white soft-dark:text-gray-900 leaf:text-gray-900 water:text-[#101828] light:text-gray-900 orange:text-[#101828] rounded-lg hover:bg-white/20 soft-dark:hover:bg-white/80 orange:hover:bg-white/80 leaf:hover:bg-white/80 water:hover:bg-white/80 transition-all border border-white/20 orange:border-white/30 leaf:border-white/30 water:border-white/30 backdrop-blur-sm text-base font-medium hover:scale-105 active:scale-95"
              >
                View Case Studies
              </Link>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-sm text-cyan-400/70 dark:text-cyan-400/70 soft-dark:text-cyan-600 water:text-lime-800 leaf:text-sky-700 light:text-cyan-600 orange:text-orange-700 font-medium"
            >
              We buy it. You profit.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Trust Logos Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="py-16 px-0 overflow-hidden"
      >
        <TrustLogosMarquee brands={brands} />
      </motion.section>

      {/* Capabilities - Bento Grid */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-gray-900 water:text-[#101828]">
              Full-stack marketplace operations
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-gray-700 water:text-[#101828]">
              Every capability required to run marketplaces as a system, not a collection of one-off tasks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {capabilities.map((capability, index) => {
              const Icon = capability.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group bg-gradient-to-br from-white/[0.12] to-white/[0.05] dark:from-white/[0.12] dark:to-white/[0.05] soft-dark:from-white/70 soft-dark:to-white/60 light:from-gray-50 light:to-white orange:from-white/70 orange:to-white/60 leaf:from-white/70 leaf:to-white/60 water:from-white/70 water:to-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-white/20 soft-dark:border-white/20 light:border-gray-200 orange:border-white/30 leaf:border-white/20 water:border-white/30 hover:border-cyan-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20 relative overflow-hidden flex flex-col min-h-[200px] dark:hover:border-cyan-500/50 dark:hover:shadow-cyan-500/20 soft-dark:hover:border-lime-600/50 soft-dark:hover:shadow-lime-500/20 light:hover:border-cyan-600/50 light:hover:shadow-cyan-500/20 orange:hover:border-orange-600/50 orange:hover:shadow-orange-500/20 leaf:hover:border-cyan-600/50 leaf:hover:shadow-cyan-500/20 water:hover:border-emerald-600/50 water:hover:shadow-emerald-500/20"
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-2xl dark:from-cyan-500/10 soft-dark:from-lime-500/10 light:from-cyan-500/10 orange:from-orange-500/10 leaf:from-sky-500/10" />
                  </div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/30 to-cyan-600/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-cyan-500/20 dark:from-cyan-500/30 dark:to-cyan-600/10 dark:shadow-cyan-500/20 soft-dark:from-lime-600/30 soft-dark:to-lime-700/10 soft-dark:shadow-lime-500/20 light:from-cyan-600/30 light:to-cyan-700/10 light:shadow-cyan-500/20 orange:from-orange-600/30 orange:to-orange-700/10 orange:shadow-orange-500/20 water:from-lime-600/30 water:to-lime-700/10 water:shadow-lg water:shadow-lime-500/20 leaf:from-sky-600/30 leaf:to-sky-700/10 leaf:shadow-lg leaf:shadow-sky-500/20">
                      <Icon className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300 transition-colors dark:text-cyan-400 dark:group-hover:text-cyan-300 soft-dark:text-lime-700 soft-dark:group-hover:text-lime-600 light:text-cyan-600 light:group-hover:text-cyan-500 orange:text-orange-700 water:text-lime-700 leaf:text-sky-700" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 group-hover:text-white transition-colors duration-300 dark:text-white dark:group-hover:text-cyan-300 soft-dark:text-gray-900 soft-dark:group-hover:text-lime-700 light:text-gray-900 light:group-hover:text-cyan-600 orange:text-gray-900 orange:group-hover:text-orange-700 water:text-[#101828] water:group-hover:text-lime-700">{capability.title}</h3>
                    <p className="text-sm text-gray-700 leading-relaxed flex-grow dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-gray-700 water:text-[#101828]">{capability.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How Our Model Works - REQUIRED HIGH ON PAGE */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-4">
            <span className="inline-block px-4 py-1.5 bg-lime-600/20 text-lime-800 rounded-full text-xs font-semibold tracking-wide mb-6 dark:bg-cyan-500/20 dark:text-cyan-400 soft-dark:bg-cyan-500/20 soft-dark:text-cyan-600 light:bg-cyan-100 light:text-cyan-700 orange:bg-gradient-to-r orange:from-orange-600 orange:to-orange-700 orange:text-white orange:shadow-lg orange:shadow-orange-500/20 water:bg-lime-600/20 water:text-lime-900 leaf:bg-gradient-to-r leaf:from-sky-600 leaf:to-sky-700 leaf:text-white leaf:shadow-lg leaf:shadow-sky-500/20">
              THE BUY-SELL-ADVERTISE-PROTECT MODEL
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-center bg-gradient-to-b from-gray-900 to-gray-700 bg-clip-text text-transparent leading-tight pb-2 dark:from-white dark:to-gray-400 soft-dark:from-gray-900 soft-dark:to-gray-700 light:from-gray-900 light:to-gray-700 orange:from-[#101828] orange:to-[#101828] leaf:from-gray-900 leaf:to-gray-700 water:from-[#101828] water:to-[#101828]">
            Zero risk. Full control.<br />One operating system.
          </h2>
          <p className="text-lg text-gray-800 text-center max-w-3xl mx-auto mb-16 leading-relaxed dark:text-gray-300 soft-dark:text-gray-800 light:text-gray-700 orange:text-[#101828] leaf:text-gray-700 water:text-[#101828]">
            Epic operates through the Buy-Sell-Advertise-Protect model, which governs both U.S. and global execution. We assume inventory ownership, operate storefronts directly, fund advertising, and protect brand equity, all under one unified structure.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { icon: ShoppingCart, num: '01', title: 'Buy', desc: 'Epic performs an upfront inventory purchase, immediately converting inventory into cash for the brand and removing inventory risk.', tagline: 'Cash now. Risk removed.' },
              { icon: Globe2, num: '02', title: 'Sell', desc: 'Epic operates listings and storefronts across U.S. and international marketplaces using a unified operational framework.', tagline: 'One system. Every market.' },
              { icon: BarChart3, num: '03', title: 'Advertise', desc: 'Epic funds and manages all advertising in the U.S. and abroad. Campaigns are optimized for efficiency and profitability, not budget utilization.', tagline: 'We fund. We optimize.' },
              { icon: Shield, num: '04', title: 'Protect', desc: 'Through the Brand Protection Command Center, Epic enforces pricing integrity, removes unauthorized sellers, and defends branded search demand globally.', tagline: 'Your brand. Our defense.' }
            ].map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative bg-gradient-to-br from-white/10 to-white/[0.05] dark:from-white/10 dark:to-white/[0.05] soft-dark:from-white/70 soft-dark:to-white/60 light:from-gray-50 light:to-white orange:from-white/70 orange:to-white/60 leaf:from-white/70 leaf:to-white/60 water:from-white/70 water:to-white/60 backdrop-blur-xl rounded-2xl p-8 border border-white/20 dark:border-white/20 soft-dark:border-white/20 light:border-gray-200 orange:border-white/30 leaf:border-white/20 water:border-white/30 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/20 hover:-translate-y-1 dark:hover:border-cyan-500/30 dark:hover:shadow-cyan-500/10 soft-dark:hover:border-lime-600/30 soft-dark:hover:shadow-lime-500/10 light:hover:border-cyan-600/30 light:hover:shadow-cyan-500/10 orange:hover:border-orange-600/30 orange:hover:shadow-orange-500/10 leaf:hover:border-cyan-600/50 leaf:hover:shadow-cyan-500/20 water:hover:border-emerald-600/50 water:hover:shadow-emerald-500/20"
                >
                  {/* Number indicator */}
                  <div className="absolute top-6 right-6 text-5xl font-bold text-cyan-500/20 group-hover:text-cyan-500/30 transition-colors dark:text-cyan-500/20 dark:group-hover:text-cyan-500/30 soft-dark:text-lime-700/20 soft-dark:group-hover:text-lime-700/30 light:text-cyan-600/20 light:group-hover:text-cyan-600/30 orange:text-orange-700/20 orange:group-hover:text-orange-700/30 leaf:text-cyan-600/20 leaf:group-hover:text-cyan-600/30 water:text-emerald-600/20 water:group-hover:text-emerald-600/30">
                    {card.num}
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-all dark:bg-cyan-500/5 dark:group-hover:bg-cyan-500/10 soft-dark:bg-lime-500/5 soft-dark:group-hover:bg-lime-500/10 light:bg-cyan-500/5 light:group-hover:bg-cyan-500/10 orange:bg-orange-500/5 orange:group-hover:bg-orange-500/10 water:bg-sky-500/5 water:group-hover:bg-sky-500/10 leaf:bg-lime-500/5 leaf:group-hover:bg-lime-500/10"></div>
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/30 to-cyan-600/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all dark:from-cyan-500/20 dark:to-cyan-600/10 soft-dark:from-lime-600/20 soft-dark:to-lime-700/10 light:from-cyan-600/20 light:to-cyan-700/10 orange:from-orange-600/30 orange:to-orange-700/10 orange:shadow-lg orange:shadow-orange-500/20 water:from-lime-600/30 water:to-lime-700/10 water:shadow-lg water:shadow-lime-500/20 leaf:from-sky-600/30 leaf:to-sky-700/10 leaf:shadow-lg leaf:shadow-sky-500/20">
                      <Icon className="w-6 h-6 text-cyan-400 dark:text-cyan-400 soft-dark:text-lime-700 light:text-cyan-600 orange:text-orange-700 leaf:text-sky-700 water:text-lime-700" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-[#101828]">{card.title}</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] leaf:text-gray-700 water:text-[#101828]">
                      {card.desc}
                    </p>
                    <p className="text-sm text-cyan-400 font-medium dark:text-cyan-400 soft-dark:text-lime-800 light:text-cyan-600 orange:text-orange-700 leaf:text-sky-700 water:text-lime-700">
                      {card.tagline}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <CtaButton variant="primary" size="md" location="Model Section" />
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-gray-900 leaf:text-gray-900 water:text-[#101828]">
              How we execute
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-gray-700 leaf:text-gray-700 water:text-[#101828]">
              Real outcomes from real operations, organized around the operating model behind our marketplace execution.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {featuredCases.map((caseStudy, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={caseStudy.link}
                  className="group bg-gradient-to-br from-white/10 to-white/[0.05] dark:from-white/10 dark:to-white/[0.05] soft-dark:from-white/70 soft-dark:to-white/60 light:from-gray-50 light:to-white orange:from-white/70 orange:to-white/60 leaf:from-white/70 leaf:to-white/60 water:from-white/70 water:to-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:border-white/20 soft-dark:border-white/20 light:border-gray-200 orange:border-white/20 leaf:border-white/20 water:border-white/30 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 block h-full hover:-translate-y-1 dark:hover:border-cyan-500/30 dark:hover:shadow-cyan-500/10 soft-dark:hover:border-lime-600/30 soft-dark:hover:shadow-lime-500/10 light:hover:border-cyan-600/30 light:hover:shadow-cyan-500/10 orange:hover:border-orange-600/30 orange:hover:shadow-orange-500/10 leaf:hover:border-cyan-600/50 leaf:hover:shadow-cyan-500/20 water:hover:border-emerald-600/50 water:hover:shadow-emerald-500/20"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs font-semibold dark:bg-cyan-500/20 dark:text-cyan-400 soft-dark:bg-lime-600/20 soft-dark:text-lime-800 light:bg-cyan-100 light:text-cyan-700 orange:bg-orange-700/30 orange:text-gray-900 water:bg-lime-600/20 water:text-lime-900 leaf:bg-sky-600/20 leaf:text-sky-900">
                      {caseStudy.pillar}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900 group-hover:text-white transition-colors dark:text-white dark:group-hover:text-cyan-400 soft-dark:text-gray-900 soft-dark:group-hover:text-lime-700 light:text-gray-900 light:group-hover:text-cyan-600 orange:text-gray-900 orange:group-hover:text-orange-700 leaf:text-gray-900 leaf:group-hover:text-cyan-700 water:text-[#101828] water:group-hover:text-emerald-700">
                    {caseStudy.title}
                  </h3>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-700 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-gray-700 leaf:text-gray-700 water:text-[#101828]">
                      <span className="text-gray-800 dark:text-gray-200 soft-dark:text-gray-800 light:text-gray-800 orange:text-gray-800 leaf:text-gray-800 water:text-[#101828]">Marketplace:</span> {caseStudy.marketplace}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-gray-700 leaf:text-gray-700 water:text-[#101828]">
                      <span className="text-gray-800 dark:text-gray-200 soft-dark:text-gray-800 light:text-gray-800 orange:text-gray-800 leaf:text-gray-800 water:text-[#101828]">Region:</span> {caseStudy.region}
                    </p>
                  </div>
                  <p className="text-sm text-gray-800 mb-4 dark:text-gray-300 soft-dark:text-gray-800 light:text-gray-800 orange:text-gray-800 leaf:text-gray-800 water:text-[#101828]">{caseStudy.objective}</p>
                  <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium dark:text-cyan-400 soft-dark:text-lime-700 light:text-cyan-600 orange:text-orange-700 water:text-lime-700 leaf:text-sky-700">
                    View case study
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-gray-900 rounded-lg hover:bg-white/20 transition-all border border-white/20 text-sm font-medium hover:scale-105 active:scale-95 dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-gray-900 leaf:text-gray-900 water:text-[#101828]"
            >
              View all case studies
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-white/[0.12] to-white/[0.04] dark:from-white/[0.12] dark:to-white/[0.04] soft-dark:from-white/70 soft-dark:to-white/60 light:from-gray-50 light:to-white orange:from-white/70 orange:to-white/60 leaf:from-white/70 leaf:to-white/60 water:from-white/70 water:to-white/60 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-white/20 soft-dark:border-white/20 light:border-gray-200 orange:border-white/30 leaf:border-white/20 water:border-white/30 p-8 md:p-10">
            <div className="max-w-4xl mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900 dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-[#101828]">
                Company Facts
              </h2>
              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-700 orange:text-[#101828] leaf:text-gray-700 water:text-[#101828] leading-relaxed">
                Epic Global Inc. is a global marketplace operator that buys inventory at wholesale, manages marketplace sales channels, funds advertising, and handles brand protection across international ecommerce platforms. The company is led by Glen Jensen and operates across Amazon, Walmart, eBay, and select international marketplaces with a system built around the Buy, Sell, Advertise, Protect model.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {entityFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-2xl border border-white/15 dark:border-white/15 soft-dark:border-white/20 light:border-gray-200 orange:border-white/20 leaf:border-white/20 water:border-white/20 bg-white/5 dark:bg-white/5 soft-dark:bg-white/60 light:bg-white orange:bg-white/40 leaf:bg-white/50 water:bg-white/50 p-5"
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-cyan-500 dark:text-cyan-400 soft-dark:text-lime-700 light:text-cyan-600 orange:text-orange-700 leaf:text-cyan-700 water:text-emerald-700 mb-2">
                    {fact.label}
                  </p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-[#101828] leaf:text-gray-900 water:text-[#101828] mb-2">
                    {fact.value}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 soft-dark:text-gray-700 light:text-gray-600 orange:text-[#101828] leaf:text-gray-700 water:text-[#101828] leading-relaxed">
                    {fact.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Strip */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white soft-dark:text-gray-900 light:text-gray-900 orange:text-gray-900 leaf:text-gray-900">
            Ready for an operator model,<br />not another agency?
          </h2>
          <p className="text-lg text-gray-800 mb-10 max-w-2xl mx-auto leading-relaxed dark:text-gray-300 soft-dark:text-gray-800 light:text-gray-700 orange:text-gray-800 leaf:text-gray-700">
            If you want execution that looks like a system, let's map your next 90 days.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <CtaButton variant="primary" size="lg" location="Final CTA Section" />
          </div>
        </div>
      </section>
    </div>
  );
}

