export type CourseSeed = {
  slug: string;
  title: string;
  description: string;
  sortOrder: number;
};

export const RECOGNITION_COURSES: CourseSeed[] = [
  {
    slug: "leadership-and-organizational-excellence",
    title: "Leadership and Organizational Excellence",
    sortOrder: 1,
    description:
      "Recognizes individuals who demonstrate outstanding leadership and excellence in building and managing organizations. It honors achievements in strategic direction, organizational development, and effective decision-making. This area celebrates leaders who inspire people and create lasting organizational impact.",
  },
  {
    slug: "business-leadership-and-entrepreneurship",
    title: "Business Leadership and Entrepreneurship",
    sortOrder: 2,
    description:
      "Recognizes entrepreneurs and business leaders who have built successful ventures and demonstrated exceptional leadership. It highlights innovation, enterprise development, job creation, and sustainable business practices. This distinction celebrates individuals who turn ideas into meaningful economic opportunities.",
  },
  {
    slug: "innovation-and-strategic-management",
    title: "Innovation and Strategic Management",
    sortOrder: 3,
    description:
      "Recognizes individuals who have introduced innovative ideas, systems, products, or strategies that create meaningful change. It celebrates strategic thinkers who successfully navigate challenges and identify new opportunities. This area honors contributions that advance organizations, industries, or communities.",
  },
  {
    slug: "global-leadership-and-social-impact",
    title: "Global Leadership and Social Impact",
    sortOrder: 4,
    description:
      "Recognizes leaders whose work has created meaningful impact across communities, organizations, or international settings. It celebrates individuals who demonstrate vision, collaboration, and a commitment to addressing important social challenges. This distinction honors leadership that extends beyond personal or organizational success.",
  },
  {
    slug: "executive-leadership-and-governance",
    title: "Executive Leadership and Governance",
    sortOrder: 5,
    description:
      "Recognizes senior leaders who have demonstrated excellence in organizational governance, administration, and executive decision-making. It highlights responsible leadership, accountability, strategic oversight, and institutional development. This area honors individuals whose leadership has strengthened the organizations they serve.",
  },
  {
    slug: "entrepreneurship-and-economic-development",
    title: "Entrepreneurship and Economic Development",
    sortOrder: 6,
    description:
      "Recognizes entrepreneurs and business innovators who contribute to economic growth and opportunity. It celebrates achievements in enterprise creation, employment, innovation, and community-based economic development. This area honors individuals whose entrepreneurial work produces lasting economic value.",
  },
  {
    slug: "humanitarian-leadership-and-community-development",
    title: "Humanitarian Leadership and Community Development",
    sortOrder: 7,
    description:
      "Recognizes individuals who have dedicated significant efforts to improving the lives of others and strengthening communities. It celebrates humanitarian initiatives, volunteerism, social programs, and community leadership. This distinction honors people whose service creates positive and lasting change.",
  },
  {
    slug: "education-leadership-and-institutional-development",
    title: "Education Leadership and Institutional Development",
    sortOrder: 8,
    description:
      "Recognizes educators, academic leaders, school founders, administrators, and advocates who have made significant contributions to education. It celebrates achievements in educational leadership, institution-building, academic innovation, and access to learning. This area honors individuals whose work has helped advance education and educational institutions.",
  },
];
