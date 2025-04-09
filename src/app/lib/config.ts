const config = {
  app: {
    emoji: "📸",
    name: "Groupshot",
    description: "For moments where you shouldn't be apart.",
    callToAction: {
      buttonText: {
        text: "Click here",
        href: "/signup",
      },
      text: "to get started.",
    },
  },
  layout: {
    footer: {
      text: "© 2025 Aditya Banerjee. All rights reserved.",
    },
    sidebar: {
      authenticated: {
        title: "Menu",
        items: [
          {
            label: "Dashboard",
            href: "/dashboard",
          },
        ],
      },
      unauthenticated: {
        title: "Menu",
        items: [
          {
            label: "Home",
            href: "/",
          },
          {
            label: "Sign Up",
            href: "/signup",
          },
          {
            label: "Login",
            href: "/login",
          },
        ],
      },
    },
  },
};

export default config;
