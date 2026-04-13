

# Eco Trippers — Premium Travel & Visa Website

## Brand & Design
- **Color palette**: Green (#1DB954-ish from logo), white, dark charcoal, with gold accents for premium feel
- **Typography**: Modern sans-serif (Inter/Poppins) with elegant headings
- **Logo**: Uploaded logo used in header/footer
- **Tone**: Modern travel agency — energetic, trustworthy, premium

## Pages & Routes

### 1. Homepage (`/`)
- **Hero Section**: Full-width animated hero with travel imagery, headline "Travel More. Stress Less.", subheadline, and CTA buttons (Book Consultation / Explore Packages)
- **Stats Counter**: Animated counters — 3.5K+ Happy Customers, 110+ Tours, 97.5% Positive Reviews, 564+ Visa Success
- **Services Overview**: 6 service cards (Visa Processing, Air Tickets, Hotel Booking, Tour Packages, Luxury Trips, Umrah Packages)
- **Featured Packages**: Country-wise cards with flags, pricing in BDT, duration, highlights, and "Book Now" button
- **Why Choose Us**: Trust indicators with icons
- **Gallery**: Masonry/grid gallery with lightbox of travel & visa success images
- **Blog Section**: 3 featured blog post cards
- **Testimonials**: Client success stories carousel
- **FAQ Accordion**: Common travel/visa questions
- **Animated Flight Map Section**: SVG/CSS animated map showing flight routes from Bangladesh (Dhaka) to 15+ international destinations with animated plane icons tracing curved paths — unique and eye-catching
- **Contact Hook**: Bold CTA banner to get in touch
- **Google Map Embed**: Office location in Banani, Dhaka
- **Footer**: Logo, quick links, services, contact info, social links, WhatsApp button

### 2. About (`/about`)
- Company story (founded 2019 by Monabbir Ahammed Khan & Bidarul Islam)
- Mission & vision
- Team section
- Company values

### 3. Services (`/services`)
- Detailed cards for each service: Visa Processing, Air Tickets, Hotel Reservations, Tour Packages, 5-Star Luxury Trips, Umrah Packages

### 4. Visa Services (`/visa-services`)
- Country-wise visa cards with flags, starting prices (Malaysia ৳5,500, Japan ৳9,500, Thailand ৳6,500, etc.)
- 21+ countries coverage highlight
- Process steps timeline

### 5. Packages (`/packages`)
- Featured packages with country flags, pricing, duration, inclusions/exclusions
- Japan & South Korea group tour (BDT 209,900), London package (BDT 220,000), etc.
- Each package has a "Book Now" button

### 6. Gallery (`/gallery`)
- Full gallery page with category filters

### 7. Blog (`/blog`)
- Blog listing with travel tips, visa guides, destination spotlights

### 8. Contact (`/contact`)
- Contact form, office address, phone, email, WhatsApp links
- Google Map embed

## Key Interactions
- **Book Now Button**: Opens a modal booking form (Name, Phone, Email, Package/Service, Travel Date, Message). Submit button composes a WhatsApp message to +8801886345126 with all form details and opens WhatsApp
- **Floating WhatsApp Button**: Always visible for quick contact
- **Smooth scroll animations** on all sections using intersection observer
- **Animated flight map**: Custom SVG map with CSS keyframe animations showing curved flight paths from Dhaka to destinations worldwide with moving plane icons

## Shared Components
- **Header**: Sticky navbar with logo, nav links, "Book Now" CTA
- **Footer**: Full footer with columns, contact info, social links
- **Booking Modal**: Reusable across all pages

