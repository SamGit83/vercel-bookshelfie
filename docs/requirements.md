# Bookshelfie Website Requirements Document

## Overview
The Bookshelfie website serves as a marketing and acquisition platform for the Bookshelfie iOS app available on the App Store. Its primary purpose is to attract users through free, value-adding tools, then guide them to download the app for enhanced freemium and premium features. This document outlines the functional and non-functional requirements focused on free tools, user attraction, App Store routing, and marketing strategy.

## Functional Requirements

### Free Tools
1. **Book Recommendation Engine**: Provide a tool that allows users to input their reading preferences and receive personalized book recommendations based on genre, author, or similar titles.
2. **Reading Tracker**: Offer a simple web-based tool for users to log books they've read, track reading progress, and generate basic reading statistics.
3. **Book Search and Discovery**: Implement a search functionality that enables users to find books by title, author, ISBN, or keywords, with links to purchase or preview options.
4. **Reading List Generator**: Create a tool that helps users build and organize reading lists, with options to categorize by priority, genre, or completion status.

### User Attraction
1. **Compelling Landing Page**: Design an engaging homepage that clearly communicates the value proposition of the free tools and the premium app features.
2. **User Onboarding Flow**: Implement a smooth introduction process for new visitors, highlighting the benefits of the free tools and encouraging app download.
3. **Social Proof Elements**: Include testimonials, user reviews, and success stories to build trust and credibility.
4. **Content Marketing**: Provide blog posts, articles, and resources related to reading habits, book recommendations, and literary insights to attract organic traffic.

### App Store Routing
1. **Clear Call-to-Action Buttons**: Place prominent buttons and links throughout the site that direct users to the Bookshelfie app on the App Store.
2. **App Feature Teasers**: Showcase premium features available in the app that complement the free web tools, encouraging upgrades.
3. **Download Tracking**: Implement mechanisms to track user journeys from website tools to app downloads for analytics purposes.
4. **Cross-Platform Compatibility**: Ensure the website effectively routes users to the iOS App Store, with appropriate messaging for non-iOS users.

### Marketing Strategy
1. **SEO Optimization**: Optimize all pages for relevant keywords related to book discovery, reading tools, and book recommendations to improve search engine visibility.
2. **Social Media Integration**: Include share buttons and links to Bookshelfie social media profiles to facilitate content sharing and community building.
3. **Email Capture**: Provide forms for users to subscribe to newsletters featuring book recommendations, reading tips, and app updates.
4. **Referral Program**: Implement a system where users can share free tools with friends and earn rewards or premium features in the app.

## Non-Functional Requirements

### Performance
1. **Fast Loading Times**: Ensure all pages and tools load within 2 seconds on standard internet connections.
2. **Responsive Design**: The website must be fully responsive and functional across desktop, tablet, and mobile devices.

### Usability
1. **Intuitive Navigation**: Provide clear, logical navigation that allows users to easily access free tools and app download options.
2. **Accessibility**: Comply with WCAG 2.1 AA standards to ensure the website is accessible to users with disabilities.

### Security
1. **Data Privacy**: Implement measures to protect user data entered into free tools, complying with GDPR and CCPA regulations.
2. **Secure Connections**: Use HTTPS encryption for all website interactions.

### Scalability
1. **High Traffic Handling**: The website must be able to handle increased traffic during marketing campaigns or viral sharing of tools.
2. **Modular Tool Addition**: Design the architecture to easily add new free tools without disrupting existing functionality.

### Analytics and Monitoring
1. **User Behavior Tracking**: Implement analytics to track tool usage, conversion rates to app downloads, and user engagement metrics.
2. **Performance Monitoring**: Set up monitoring to track website uptime, loading speeds, and error rates.

## Marketing Website

### Purpose

The marketing website is a free tools site designed to provide immediate value to book lovers and readers, while driving subscriptions and downloads of the paid Bookshelfie iOS app (Book Shelfie by Sam Bhattacharjee). Each free tool serves as a lead magnet — users get useful functionality at no cost, and are encouraged to upgrade to the full app for premium features.

### Functional Requirements

- **Home Page (`/`)**:
  - Elegant header with navigation links to Home and Contact.
  - Hero section with clear value proposition: "Free book tools — get value now, upgrade for more."
  - Central 3×3 responsive grid displaying 9 free tool cards, each with an icon/emoji, tool title, short use-case description, and a clickable link to the dedicated tool page (`/tools/[id]`).
  - Footer with copyright notice, App Store link, and contact link.

- **Contact Page (`/contact`)**:
  - App details: Book Shelfie — a reading and book tracking app for iOS.
  - Developer info: Sam Bhattacharjee.
  - Direct App Store link: https://apps.apple.com/se/app/book-shelfie/id6753343399?l=en-GB
  - Prominent call-to-action to download/subscribe to the premium app.
  - Brief description of what the full app offers beyond the free tools.

- **Tool Pages (`/tools/[id]`)**:
  - Placeholder pages for each of the 9 free tools (to be populated later with actual functionality).
  - Polished "Coming Soon" message with tool name and description.
  - Clear CTA to download the full Bookshelfie app from the App Store.
  - Back navigation to the home page.

### Placeholder Free Tools (3×3 Grid)

1. **🤖 AI Prompt Generator**: Generate personalized AI prompts for book-related creative writing, reviews, or summaries based on your inputs.
2. **📖 Reading Progress Tracker**: Log daily reading sessions and track progress across your entire library.
3. **🏷️ Genre Sorter**: Automatically categorize and sort books by genre for easy discovery.
4. **🎯 Reading Goal Setter**: Set customizable annual reading goals and monitor achievement with visuals.
5. **💡 Smart Recommendations**: Receive personalized book suggestions based on your reading history.
6. **✍️ Author Explorer**: Explore full bibliographies and details of your favorite authors.
7. **📚 Shelf Planner**: Virtually design and arrange your physical or digital bookshelves.
8. **📊 Reading Insights**: Generate detailed statistics and insights from your reading habits.
9. **🔍 ISBN Lookup**: Quickly fetch book details by entering an ISBN without scanning.

### AI Prompt Generator Detailed Specifications

- **Form Fields**: Topic, Tone, Length, Style
- **Submission**: Generate prompt using Grok AI (via GROK_API_KEY)
- **Display**: Show the generated prompt
- **Actions**: Buttons for copy to clipboard and share on socials
- **Alignment**: Serves as a lead magnet for book-related tools, encouraging app download

### Non-Functional Requirements

- **Design**: Elegant, simple, modern aesthetic — minimalist layout, subtle gradients (blue-to-green palette), card-based design with hover effects (scale, shadow lift), rounded corners, glassmorphism (backdrop-blur, semi-transparent backgrounds), sans-serif font (Inter via `next/font/google`), fully responsive (mobile-first, 1-col → 2-col → 3-col grid).
- **Performance**: Fast loading via Next.js SSG/SSR, optimized fonts, minimal dependencies.
- **Accessibility**: Semantic HTML, proper heading hierarchy, sufficient color contrast, keyboard-navigable links and buttons.

This requirements document serves as the foundation for developing the Bookshelfie website. All development efforts should align with these requirements to ensure the website effectively supports customer acquisition for the Bookshelfie app.