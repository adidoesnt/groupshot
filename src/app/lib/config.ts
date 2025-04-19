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
  onboarding: {
    title: "Onboarding Checklist",
    description:
      "You're almost there! The remaining steps in your onboarding process can be seen below.",
    links: {
      uploadProfilePicture: {
        href: "/onboarding/upload-profile-picture",
      },
      choosePlan: {
        href: "/onboarding/choose-plan",
      },
      addFriends: {
        href: "/onboarding/add-friends",
      },
      generateFirstPhoto: {
        href: "/onboarding/generate-first-photo",
      },
    },
  },
};

export default config;
