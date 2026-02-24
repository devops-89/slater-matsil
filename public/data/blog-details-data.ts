import { BLOG_DETAIL_PROPS } from "@/utils/types";
import blog1 from "@/public/images/blog/blog1.jpg";
import blog2 from "@/public/images/blog/blog2.jpg";
import blog3 from "@/public/images/blog/blog3.jpg";
import blogUpcoming from "@/public/images/blog/emergingTrend.jpg";
import steven from "@/professionals/transparent/steven-slater.png";
import brian from "@/professionals/brian_c_thumb.jpg";
import ruojian from "@/professionals/ruojian.jpg";
import yumin from "@/professionals/yumin_thumb.jpg";
import amitava from "@/professionals/transparent/amitava-chatterjee.png";

export const BLOG_DETAILS_DATA: BLOG_DETAIL_PROPS[] = [
  {
    slug: "emerging-trends-ai-patent-law",
    hero: {
      title: "Emerging Trends in AI Patent Law",
      category: "Upcoming Webinar",
      date: "March 12, 2026",
      readTime: "45 min",
      author: "Steven Slater",
      authorImage: steven,
      authorTitle: "Co-founding Partner",
      badge: "Upcoming",
    },
    content: {
      intro:
        "As artificial intelligence continues to redefine the boundaries of innovation, patent law is evolving at an unprecedented pace. This webinar explores the critical intersection of AI technology and intellectual property rights.",
      sections: [
        {
          heading: "The Shift in Inventorship",
          content:
            "One of the most debated topics in AI patent law today is whether an AI system can be named as an inventor. Courts across major jurisdictions, including the USPTO and EPO, have consistently held that inventors must be natural persons. However, the level of human contribution required when using AI tools remains a complex gray area.",
        },
        {
          heading: "Patent Eligibility Challenges",
          content:
            "AI-driven inventions often face hurdles under 35 U.S.C. § 101, particularly regarding abstract ideas. We will discuss strategies for drafting claims that emphasize the technical improvements and practical applications of AI models to overcome these challenges.",
        },
        {
          heading: "Future Outlook",
          content: [
            "Increased focus on AI-assisted drug discovery patents.",
            "Potential legislative changes to address AI inventorship.",
            "New guidelines for AI-related disclosure requirements.",
          ],
        },
      ],
    },
  },
  {
    slug: "future-quantum-computing-ip",
    hero: {
      title: "Future of Quantum Computing IP",
      category: "Upcoming Webinar",
      date: "April 05, 2026",
      readTime: "50 min",
      author: "Brian C. Nise",
      authorImage: brian,
      authorTitle: "Patent Attorney",
      badge: "Upcoming",
    },
    content: {
      intro:
        "Quantum computing is no longer a theoretical concept but a rapidly approaching reality. Protecting the innovations within this field requires a deep understanding of both advanced physics and complex legal frameworks.",
      sections: [
        {
          heading: "The Challenge of Quantum Algorithms",
          content:
            "Standard software patent rules often struggle with the mathematical nature of quantum algorithms. We explore how to frame these as technical solutions to specific computational problems, ensuring they meet the 'physicality' requirements of major patent offices.",
        },
        {
          heading: "Hardware Innovations in Superconductivity",
          content:
            "The physical infrastructure of quantum computers involves novel materials and configurations. Protecting these physical embodiments is crucial for hardware manufacturers seeking to maintain a competitive edge in the race for quantum supremacy.",
        },
      ],
    },
  },
  {
    slug: "saas-product-just-launched",
    hero: {
      title: "Our SaaS Product Just Launched!",
      category: "Software & Innovation",
      date: "July 22, 2024",
      readTime: "4 min",
      author: "Slater Matsil Team",
      authorImage: amitava,
      authorTitle: "Intellectual Property Experts",
    },
    content: {
      intro:
        "Remote work has drastically improved my design skills by giving me the freedom to experiment, focus, and learn at my own pace. This launch marks a new chapter in how we deliver IP strategy tools to our clients.",
      sections: [
        {
          heading: "Designing for Flexibility",
          content:
            "The core of our new SaaS platform is flexibility. We understood that modern legal teams and innovators need real-time access to their patent data, coupled with powerful analytics that help them make informed decisions on the fly.",
        },
        {
          heading: "Key Features",
          content:
            "From automated portfolio tracking to AI-assisted prior art searches, the platform is designed to minimize administrative overhead and maximize strategic output. It integrates seamlessly with existing workflows, ensuring that IP strategy remains at the heart of the design process.",
        },
      ],
    },
    relatedPosts: [
      {
        slug: "emerging-trends-ai-patent-law",
        title: "Emerging Trends in AI Patent Law",
        img: blogUpcoming,
        date: "March 12, 2026",
      },
    ],
  },
  {
    slug: "mastering-intellectual-property",
    hero: {
      title: "Mastering Intellectual Property",
      category: "Articles & Guides",
      date: "June 15, 2024",
      readTime: "6 min",
      author: "Ruojian Zhang",
      authorImage: ruojian,
      authorTitle: "Patent Attorney",
    },
    content: {
      intro:
        "IP management is a cornerstone of business strategy. This guide provides a comprehensive overview of how to build and maintain a robust IP portfolio that supports long-term growth and technical leadership.",
      sections: [
        {
          heading: "Audit Your Assets",
          content:
            "Regularly reviewing your IP assets ensures they align with your business goals. Identifying gaps and underutilized patents can save costs and unlock new revenue streams through strategic licensing or internal application.",
        },
        {
          heading: "Strategic Filing Decisions",
          content:
            "Not every innovation needs a patent. We discuss when to use trade secrets versus patent filings to maximize protection and ROI. Deciding what to file and where is the first step in creating a global IP shield.",
        },
      ],
    },
  },
  {
    slug: "patents-in-biotech",
    hero: {
      title: "The Role of Patents in Biotech",
      category: "News & Insights",
      date: "May 10, 2024",
      readTime: "5 min",
      author: 'Yumin "Jeff" Zhang',
      authorImage: yumin,
      authorTitle: "Patent Agent",
    },
    content: {
      intro:
        "The biotech industry is uniquely dependent on patents to justify the massive investment required for R&D. Recent legal shifts have changed how biological substances can be protected, creating new challenges for innovators.",
      sections: [
        {
          heading: "Post-Myriad Landscape",
          content:
            "Since the Supreme Court's decision on gene patenting, the landscape has shifted significantly. We examine current USPTO guidelines for patenting biological compositions and processes that involve naturally occurring phenomena.",
        },
        {
          heading: "Global Harmonization",
          content:
            "Biotech patents often require global filing. Understanding the subtle differences between EPO and USPTO requirements is vital for international success. We'll look at best practices for drafting specifications that work in both jurisdictions.",
        },
      ],
    },
  },
];
