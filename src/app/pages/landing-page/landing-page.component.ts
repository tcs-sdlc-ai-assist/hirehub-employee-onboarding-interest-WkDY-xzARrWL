import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

interface FeatureCard {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-heading">Welcome to HireHub</h1>
        <p class="hero-subheading">
          Your gateway to an exciting career. Join our team and be part of something extraordinary.
        </p>
        <button class="cta-button primary" (click)="goToApply()">Express Your Interest</button>
      </div>
    </section>

    <!-- Why Join Us Section -->
    <section class="features-section">
      <h2 class="section-heading">Why Join Us?</h2>
      <div class="features-grid">
        @for (card of featureCards; track card.title) {
          <div class="feature-card">
            <div class="feature-icon">{{ card.icon }}</div>
            <h3 class="feature-title">{{ card.title }}</h3>
            <p class="feature-description">{{ card.description }}</p>
          </div>
        }
      </div>
    </section>

    <!-- Bottom CTA Section -->
    <section class="bottom-cta-section">
      <h2 class="bottom-cta-heading">Ready to Start Your Journey?</h2>
      <p class="bottom-cta-text">
        Take the first step towards an amazing career with HireHub. We'd love to hear from you.
      </p>
      <button class="cta-button primary" (click)="goToApply()">Apply Now</button>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }

    .hero-section {
      background: linear-gradient(135deg, #1a237e 0%, #283593 50%, #3949ab 100%);
      color: #ffffff;
      padding: 80px 24px;
      text-align: center;
      min-height: 400px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .hero-content {
      max-width: 720px;
      margin: 0 auto;
    }

    .hero-heading {
      font-size: 2.75rem;
      font-weight: 700;
      margin: 0 0 16px 0;
      line-height: 1.2;
    }

    .hero-subheading {
      font-size: 1.2rem;
      font-weight: 400;
      margin: 0 0 32px 0;
      opacity: 0.9;
      line-height: 1.6;
    }

    .cta-button {
      display: inline-block;
      padding: 14px 36px;
      font-size: 1.05rem;
      font-weight: 600;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.2s ease, transform 0.15s ease;
    }

    .cta-button:hover {
      transform: translateY(-2px);
    }

    .cta-button:active {
      transform: translateY(0);
    }

    .cta-button.primary {
      background-color: #ff6f00;
      color: #ffffff;
    }

    .cta-button.primary:hover {
      background-color: #e65100;
    }

    .features-section {
      padding: 64px 24px;
      background-color: #f5f5f5;
      text-align: center;
    }

    .section-heading {
      font-size: 2rem;
      font-weight: 700;
      color: #1a237e;
      margin: 0 0 48px 0;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 24px;
      max-width: 1000px;
      margin: 0 auto;
    }

    .feature-card {
      background-color: #ffffff;
      border-radius: 10px;
      padding: 32px 24px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      transition: box-shadow 0.2s ease, transform 0.2s ease;
    }

    .feature-card:hover {
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
      transform: translateY(-4px);
    }

    .feature-icon {
      font-size: 2.5rem;
      margin-bottom: 16px;
    }

    .feature-title {
      font-size: 1.2rem;
      font-weight: 600;
      color: #283593;
      margin: 0 0 12px 0;
    }

    .feature-description {
      font-size: 0.95rem;
      color: #555555;
      line-height: 1.5;
      margin: 0;
    }

    .bottom-cta-section {
      padding: 64px 24px;
      text-align: center;
      background-color: #ffffff;
    }

    .bottom-cta-heading {
      font-size: 1.75rem;
      font-weight: 700;
      color: #1a237e;
      margin: 0 0 16px 0;
    }

    .bottom-cta-text {
      font-size: 1.05rem;
      color: #555555;
      margin: 0 0 32px 0;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
      line-height: 1.6;
    }

    @media (max-width: 768px) {
      .hero-section {
        padding: 48px 16px;
        min-height: 300px;
      }

      .hero-heading {
        font-size: 2rem;
      }

      .hero-subheading {
        font-size: 1rem;
      }

      .features-section {
        padding: 40px 16px;
      }

      .section-heading {
        font-size: 1.5rem;
        margin-bottom: 32px;
      }

      .features-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .bottom-cta-section {
        padding: 40px 16px;
      }

      .bottom-cta-heading {
        font-size: 1.4rem;
      }
    }
  `]
})
export class LandingPageComponent {
  featureCards: FeatureCard[] = [
    {
      icon: '💡',
      title: 'Innovation',
      description: 'Work on cutting-edge projects that push the boundaries of technology and creativity.'
    },
    {
      icon: '🚀',
      title: 'Career Growth',
      description: 'Accelerate your career with mentorship programs, learning opportunities, and clear growth paths.'
    },
    {
      icon: '🤝',
      title: 'Great Culture',
      description: 'Join a diverse and inclusive team that values collaboration, respect, and work-life balance.'
    },
    {
      icon: '🌍',
      title: 'Global Impact',
      description: 'Make a difference by contributing to solutions that impact millions of people worldwide.'
    }
  ];

  constructor(private router: Router) {}

  goToApply(): void {
    this.router.navigate(['/apply']);
  }
}