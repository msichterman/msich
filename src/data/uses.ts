export type UseItem = {
  title: string;
  href?: string;
  description: string;
};

export type UseGroup = {
  title: string;
  items: UseItem[];
};

export const uses: UseGroup[] = [
  {
    title: "Tools",
    items: [
      {
        title: "Conductor",
        href: "https://www.conductor.build/",
        description:
          "I use this to run coding agents in parallel. Each one gets its own workspace.",
      },
      {
        title: "Flue",
        href: "https://flueframework.com/",
        description: "The framework I use to build agents.",
      },
      {
        title: "Cloudflare",
        href: "https://www.cloudflare.com/",
        description: "Where I deploy things.",
      },
      {
        title: "Raycast",
        href: "https://www.raycast.com/",
        description:
          "My launcher. I use it all day, mostly for clipboard history and jumping between apps.",
      },
    ],
  },
  {
    title: "Everyday",
    items: [
      {
        title: "Vivo Barefoot",
        href: "https://www.vivobarefoot.com/us/",
        description: "The shoes I wear most days.",
      },
    ],
  },
  {
    title: "Golf",
    items: [
      {
        title: "Takomo 101T irons",
        href: "https://takomogolf.com/products/iron-101t",
        description: "My irons.",
      },
      {
        title: "Kirkland Signature wedges",
        href: "https://www.costco.com",
        description: "My wedges. 52, 56, and 60 from Costco.",
      },
      {
        title: "TaylorMade Qi10 driver",
        href: "https://www.taylormadegolf.com/Qi10-Driver/DW-JJI12.html",
        description: "My driver.",
      },
    ],
  },
  {
    title: "Listening",
    items: [
      {
        title: "My First Million",
        href: "https://www.mfmpod.com/",
        description: "A podcast I listen to a lot. Sam Parr and Shaan Puri.",
      },
    ],
  },
];
