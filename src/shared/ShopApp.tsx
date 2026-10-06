'use client';

import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppLayout } from '@/shared/components/layouts/AppLayout/AppLayout';
import { ProductListingPage } from '@/shared/features/catalog/ProductListingPage';
import { CollectionDetailPage } from '@/shared/features/collection/CollectionDetailPage';
import { CartPage } from '@/shared/features/cart/CartPage';
import { HomePage } from '@/shared/features/home/HomePage';
import { AccountLockedPage } from '@/shared/features/account-locked/AccountLockedPage';
import { FindAccountPage } from '@/shared/features/find-account/FindAccountPage';
import { LoginPage } from '@/shared/features/login/LoginPage';
import { IdentityVerificationPage } from '@/shared/features/identity-verification/IdentityVerificationPage';
import { PhoneVerificationPage } from '@/shared/features/phone-verification/PhoneVerificationPage';
import { LaunchCalendarPage } from '@/shared/features/launch-calendar/LaunchCalendarPage';
import { LocalesPage } from '@/shared/features/locales/LocalesPage';
import { RegistrationPage } from '@/shared/features/signup-registration/RegistrationPage';
import { RegistrationCompleteContent } from '@/shared/features/signup-registration/RegistrationCompleteContent';
import { SignupTermsPage } from '@/shared/features/signup-terms/SignupTermsPage';
import { SignupPage } from '@/shared/features/signup/SignupPage';
import { NotFoundPage } from '@/shared/features/not-found/NotFoundPage';
import { ProductDetailPage } from '@/shared/features/product/ProductDetailPage';
import { SearchResultsPage } from '@/shared/features/search/SearchResultsPage';
import { FaqPage } from '@/shared/features/faq/FaqPage';
import { NoticesPage } from '@/shared/features/notices/NoticesPage';
import { NoticeDetailPage } from '@/shared/features/notices/NoticeDetailPage';
import { TermsPage } from '@/shared/features/terms/TermsPage';
import { TeamwearPage } from '@/shared/features/teamwear/TeamwearPage';
import { StoreFinderPage } from '@/shared/features/store-finder/StoreFinderPage';
import { MyPage } from '@/shared/features/mypage/MyPage';
import { RunningProfilePage } from '@/shared/features/mypage/RunningProfilePage';
import { MyPageStatusPage, type MyPageStatusKind } from '@/shared/features/mypage/MyPageStatusPage';
import { SupportPage } from '@/shared/features/support/SupportPage';
import {
  SupportExperiencePage,
  type SupportExperienceKind,
} from '@/shared/features/support/SupportExperiencePage';
import { ExploreDetailPage } from '@/shared/features/explore/ExploreDetailPage';
import { ExploreHubPage } from '@/shared/features/explore/ExploreHubPage';
import { ShoeFinderPage } from '@/shared/features/explore/ShoeFinderPage';
import {
  RunningExperiencePage,
  type RunningExperienceKind,
} from '@/shared/features/running-hub/RunningExperiencePage';
import type { CartItem } from '@/shared/types/cart';
import type { Platform } from '@/shared/lib/device';
import { PlatformProvider } from '@/shared/context/platform';

export function ShopShell({ platform = 'web' }: { platform?: Platform }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem('hoka-is-logged-in') === 'true';
    } catch {
      return false;
    }
  });
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = 3;
  const recentCount = 7;
  const handleLogin = () => {
    setIsLoggedIn(true);
    try {
      localStorage.setItem('hoka-is-logged-in', 'true');
    } catch {
      // ignore storage failures in demo mode
    }
  };
  const add = (item: CartItem) =>
    setCart((previous) => {
      const found = previous.find(
        (current) =>
          current.id === item.id &&
          current.color === item.color &&
          current.width === item.width &&
          current.size === item.size,
      );
      return found
        ? previous.map((current) =>
            current === found
              ? { ...current, quantity: current.quantity + item.quantity }
              : current,
          )
        : [...previous, item];
    });
  const updateQuantity = (item: CartItem, quantity: number) =>
    quantity < 1
      ? setCart((previous) => previous.filter((current) => current !== item))
      : setCart((previous) =>
          previous.map((current) => (current === item ? { ...current, quantity } : current)),
        );
  const remove = (item: CartItem) =>
    setCart((previous) => previous.filter((current) => current !== item));

  return (
    <PlatformProvider platform={platform}>
      <div className={`app platform-${platform}`}>
        <AppLayout
          cart={count}
          isLoggedIn={isLoggedIn}
          wishlistCount={wishlistCount}
          recentCount={recentCount}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductListingPage />} />
            <Route path="/products/:id" element={<ProductDetailPage onAddToCart={add} />} />
            <Route path="/collection/:id" element={<CollectionDetailPage />} />
            <Route path="/explore" element={<ExploreHubPage />} />
            <Route path="/explore/shoe-finder" element={<ShoeFinderPage />} />
            <Route path="/explore/*" element={<ExploreDetailPage />} />
            <Route
              path="/running/shoe-finder"
              element={<RunningExperienceRoute kind="shoe-finder" />}
            />
            <Route path="/running/rewards" element={<RunningExperienceRoute kind="rewards" />} />
            <Route path="/running/reviews" element={<RunningExperienceRoute kind="reviews" />} />
            <Route path="/running/alerts" element={<RunningExperienceRoute kind="alerts" />} />
            <Route path="/running/rotation" element={<RunningExperienceRoute kind="rotation" />} />
            <Route path="/running/plans" element={<RunningExperienceRoute kind="plans" />} />
            <Route
              path="/store/experience"
              element={<RunningExperienceRoute kind="store-experience" />}
            />
            <Route
              path="/cart"
              element={<CartPage cart={cart} onQuantityChange={updateQuantity} onRemove={remove} />}
            />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/support/faq" element={<FaqPage />} />
            <Route path="/support/notices" element={<NoticesPage />} />
            <Route path="/support/notices/:id" element={<NoticeDetailPage />} />
            <Route path="/support/terms" element={<TermsPage />} />
            <Route path="/support/teamwear" element={<TeamwearPage />} />
            <Route path="/support/store" element={<StoreFinderPage />} />
            {(
              [
                'inquiries',
                'inquiry-new',
                'after-sales',
                'member-benefits',
                'mileage',
              ] as SupportExperienceKind[]
            ).map((kind) => (
              <Route
                key={kind}
                path={kind === 'inquiry-new' ? '/support/inquiries/new' : `/support/${kind}`}
                element={<SupportExperiencePage kind={kind} />}
              />
            ))}
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/login/find-account" element={<FindAccountPage />} />
            <Route path="/login/account-locked" element={<AccountLockedPage />} />
            <Route path="/launch-calendar" element={<LaunchCalendarPage />} />
            <Route path="/locales" element={<LocalesPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signup/terms" element={<SignupTermsPage />} />
            <Route path="/signup/information" element={<RegistrationPage />} />
            <Route path="/signup/complete" element={<RegistrationCompleteContent />} />
            <Route path="/signup/verify" element={<IdentityVerificationPage />} />
            <Route path="/signup/verify/phone" element={<PhoneVerificationPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/mypage/running-profile" element={<RunningProfilePage />} />
            {(
              [
                'orders',
                'returns',
                'wishlist',
                'recent',
                'reviews',
                'rewards',
                'coupons',
                'referral',
                'profile',
                'addresses',
                'payment-methods',
                'restock-alerts',
                'event-entries',
                'member-activity',
                'refund-account',
              ] as MyPageStatusKind[]
            ).map((kind) => (
              <Route
                key={kind}
                path={`/mypage/${kind}`}
                element={<MyPageStatusPage kind={kind} />}
              />
            ))}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AppLayout>
      </div>
    </PlatformProvider>
  );
}

function RunningExperienceRoute({ kind }: { kind: RunningExperienceKind }) {
  return <RunningExperiencePage kind={kind} />;
}

export function ShopApp({ platform = 'web' }: { platform?: Platform }) {
  return (
    <BrowserRouter>
      <ShopShell platform={platform} />
    </BrowserRouter>
  );
}
