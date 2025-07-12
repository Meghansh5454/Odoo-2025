import React, { useState, useEffect, createContext, useContext } from 'react';
import { User, Star, Package, RefreshCw, TrendingUp, Plus, Edit, Heart, Search, Filter, ArrowLeft, MessageCircle, Shield, Truck, Camera, Save, MapPin, Calendar, Mail, Phone, Coins, TrendingDown, Gift, ShoppingBag, Award, Clock, CheckCircle, UserCheck, Send, Download, Minus } from 'lucide-react'; // Lucide icons

// --- Inline Styles (replacing Tailwind CSS) ---
// These styles are basic and can be expanded upon with proper CSS files or a different styling solution.

const rootContainerStyle = {
    fontFamily: 'sans-serif', // Fallback font
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#F7FAFC', // Light gray background
};

const appContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#F7FAFC',
};

const pageContainerStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7FAFC',
    padding: '1rem',
};

const formCardStyle = {
    backgroundColor: '#FFFFFF',
    padding: '2rem',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '28rem',
};

const formTitleStyle = {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2D3748',
    marginBottom: '2rem',
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
};

const labelStyle = {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#4A5568',
    marginBottom: '0.25rem',
};

const inputStyle = {
    width: '100%',
    padding: '0.5rem 1rem',
    border: '1px solid #CBD5E0',
    borderRadius: '0.375rem',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    outline: 'none',
    transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
    boxSizing: 'border-box', // Ensure no overflow
};

const primaryButtonStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: '0.75rem 1rem',
    border: '1px solid transparent',
    borderRadius: '0.375rem',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    fontSize: '1.125rem',
    fontWeight: '500',
    color: '#FFFFFF',
    backgroundColor: '#3182CE', // Blue-600
    cursor: 'pointer',
    transition: 'background-color 0.15s ease-in-out',
};

const secondaryButtonStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: '0.75rem 1rem',
    border: '1px solid transparent',
    borderRadius: '0.375rem',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    fontSize: '1.125rem',
    fontWeight: '500',
    color: '#FFFFFF',
    backgroundColor: '#48BB78', // Green-600
    cursor: 'pointer',
    transition: 'background-color 0.15s ease-in-out',
};

const linkButtonStyle = {
    fontWeight: '500',
    color: '#3182CE',
    background: 'none',
    border: 'none',
    padding: '0',
    cursor: 'pointer',
    textDecoration: 'underline',
};

const formTextStyle = {
    marginTop: '1.5rem',
    textAlign: 'center',
    color: '#4A5568',
};

const messageBoxOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    zIndex: 50,
};

const messageBoxContentStyle = {
    backgroundColor: '#FFFFFF',
    borderRadius: '0.5rem',
    padding: '1.5rem',
    boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
    maxWidth: '24rem',
    width: '100%',
    textAlign: 'center',
};

const messageBoxButtonStyle = {
    padding: '0.5rem 1.5rem',
    backgroundColor: '#3182CE',
    color: '#FFFFFF',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
    transition: 'background-color 0.15s ease-in-out',
};

const footerStyle = {
    backgroundColor: '#2D3748', // Gray-800
    color: '#FFFFFF',
    padding: '1.5rem 0',
    marginTop: 'auto',
    borderRadius: '0.5rem 0.5rem 0 0',
};

const footerContentStyle = {
    maxWidth: '72rem',
    margin: '0 auto',
    padding: '0 1.5rem',
    textAlign: 'center',
};

const footerLinksStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginTop: '0.5rem',
};

const footerLinkStyle = {
    color: '#A0AEC0', // Gray-400
    textDecoration: 'none',
    transition: 'color 0.15s ease-in-out',
};

const mainContentStyle = {
    flexGrow: 1,
    maxWidth: '72rem',
    margin: '0 auto',
    padding: '3rem 1.5rem',
};

const heroSectionStyle = {
    position: 'relative',
    backgroundColor: '#3182CE', // Blue-600 to Purple-600 gradient
    color: '#FFFFFF',
    padding: '5rem 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: '0 0 0.75rem 0.75rem',
    boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
};

const heroOverlayStyle = {
    position: 'absolute',
    inset: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.2,
};

const heroContentStyle = {
    position: 'relative',
    zIndex: 10,
};

const heroTitleStyle = {
    fontSize: '2.25rem', // md:text-6xl
    fontWeight: '800',
    lineHeight: '1.25',
    marginBottom: '1.5rem',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.25)',
};

const heroSubtitleStyle = {
    fontSize: '1.125rem', // md:text-xl
    marginBottom: '2.5rem',
    maxWidth: '42rem',
    margin: '0 auto 2.5rem',
    opacity: 0.9,
};

const heroButtonsContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    justifyContent: 'center',
};

const heroPrimaryButtonStyle = {
    padding: '1rem 2rem',
    backgroundColor: '#FFFFFF',
    color: '#3182CE', // Blue-700
    borderRadius: '9999px', // Full rounded
    fontWeight: 'bold',
    fontSize: '1.125rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    outline: 'none',
    transition: 'transform 0.3s ease-in-out, background-color 0.3s ease-in-out',
};

const heroSecondaryButtonStyle = {
    padding: '1rem 2rem',
    border: '2px solid #FFFFFF',
    color: '#FFFFFF',
    borderRadius: '9999px',
    fontWeight: 'bold',
    fontSize: '1.125rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    outline: 'none',
    transition: 'transform 0.3s ease-in-out, background-color 0.3s ease-in-out, color 0.3s ease-in-out',
};

const sectionStyle = {
    maxWidth: '72rem',
    margin: '0 auto',
    padding: '4rem 1.5rem',
};

const altSectionStyle = {
    backgroundColor: '#F7FAFC', // Gray-100
    padding: '4rem 1.5rem',
    borderRadius: '0.75rem',
    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
};

const sectionTitleStyle = {
    fontSize: '2.25rem',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2D3748',
    marginBottom: '3rem',
};

const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
};

const cardStyle = {
    backgroundColor: '#FFFFFF',
    borderRadius: '0.75rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.3s ease-in-out',
};

const horizontalCardStyle = {
    backgroundColor: '#FFFFFF',
    borderRadius: '0.75rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.3s ease-in-out',
    minWidth: '280px',
    maxWidth: '320px',
    flexShrink: 0,
};

const cardImageStyle = {
    width: '100%',
    height: '12rem', // h-48
    objectFit: 'cover',
};

const cardContentStyle = {
    padding: '1rem',
    width: '100%',
    boxSizing: 'border-box',
    overflow: 'hidden',
};

const cardTitleStyle = {
    fontWeight: '600',
    fontSize: '1.25rem',
    color: '#2D3748',
    marginBottom: '0.5rem',
};

const cardDescriptionStyle = {
    color: '#4A5568',
    fontSize: '0.875rem',
};

const cardFooterStyle = {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

const cardPointsStyle = {
    color: '#3182CE', // Blue-600
    fontWeight: 'bold',
};

const cardButtonStyle = {
    padding: '0.5rem 1rem',
    backgroundColor: '#3182CE', // Blue-500
    color: '#FFFFFF',
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
    transition: 'background-color 0.15s ease-in-out',
};

const categoryGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1.5rem',
};

const categoryCardStyle = {
    backgroundColor: '#FFFFFF',
    borderRadius: '0.5rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    padding: '1.5rem',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'transform 0.3s ease-in-out',
};

const categoryImageStyle = {
    margin: '0 auto 1rem',
    borderRadius: '9999px', // Full rounded
    width: '6.25rem', // 100px
    height: '6.25rem', // 100px
};

const categoryTitleStyle = {
    fontWeight: '600',
    fontSize: '1.125rem',
    color: '#2D3748',
};

const howItWorksGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2.5rem',
};

const howItWorksCardStyle = {
    padding: '1.5rem',
    backgroundColor: '#FFFFFF',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const howItWorksIconStyle = {
    fontSize: '3.125rem',
    marginBottom: '1rem',
    color: '#3182CE', // Example color
};

const howItWorksTitleStyle = {
    fontWeight: '600',
    fontSize: '1.25rem',
    color: '#2D3748',
    marginBottom: '0.5rem',
};

const howItWorksDescriptionStyle = {
    color: '#4A5568',
};

const spinnerStyle = {
    border: '4px solid rgba(0, 0, 0, 0.1)',
    borderTop: '4px solid #3182CE', // Blue-500
    borderRadius: '50%',
    width: '4rem',
    height: '4rem',
    animation: 'spin 1s linear infinite',
    display: 'inline-block',
};

const userAvatarStyle = {
    width: '6rem', // w-24
    height: '6rem', // h-24
    backgroundColor: '#BFDBFE', // Blue-200
    borderRadius: '9999px', // Full rounded
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#2B6CB0', // Blue-700
    fontSize: '3.125rem', // text-5xl
    fontWeight: 'bold',
};

const userAvatarStyleSmall = {
    width: '3rem', // w-12
    height: '3rem', // h-12
    backgroundColor: '#BFDBFE', // Blue-200
    borderRadius: '9999px', // Full rounded
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#2B6CB0', // Blue-700
    fontSize: '1.25rem', // text-xl
    fontWeight: 'bold',
};

const userAvatarStyleBig = {
    width: '8rem', // w-32
    height: '8rem', // h-32
    backgroundColor: '#BFDBFE', // Blue-200
    borderRadius: '9999px', // Full rounded
    objectFit: 'cover',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#2B6CB0', // Blue-700
    fontSize: '3.125rem', // text-2xl
    fontWeight: 'bold',
};

const dashboardProfileSectionStyle = {
    backgroundColor: '#FFFFFF',
    borderRadius: '0.75rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '2rem',
    marginBottom: '2.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
};

const pointsButtonStyle = {
    marginTop: '0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#3182CE', // Blue-500
    color: '#FFFFFF',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
    transition: 'background-color 0.15s ease-in-out',
};

const emptyStateCardStyle = {
    backgroundColor: '#FFFFFF',
    padding: '1.5rem',
    borderRadius: '0.5rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    textAlign: 'center',
    color: '#4A5568',
};

const emptyStateButtonStyle = {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#48BB78', // Green-600
    color: '#FFFFFF',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
    transition: 'background-color 0.15s ease-in-out',
};

const dashboardGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
};

const horizontalGridStyle = {
    display: 'flex',
    flexWrap: 'nowrap',
    gap: '1.5rem',
    overflowX: 'auto',
    padding: '0.5rem 0',
    scrollbarWidth: 'thin',
    scrollbarColor: '#CBD5E0 #F7FAFC',
};

// Custom scrollbar styles for webkit browsers
const horizontalGridStyleWithScrollbar = {
    ...horizontalGridStyle,
    '&::-webkit-scrollbar': {
        height: '8px',
    },
    '&::-webkit-scrollbar-track': {
        background: '#F7FAFC',
        borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
        background: '#CBD5E0',
        borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        background: '#A0AEC0',
    },
};

const dashboardItemCardStyle = {
    backgroundColor: '#FFFFFF',
    borderRadius: '0.75rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.3s ease-in-out',
};

const dashboardItemImageStyle = {
    width: '100%',
    height: '12rem', // h-48
    objectFit: 'cover',
};

const dashboardItemContentStyle = {
    padding: '1rem',
};

const dashboardItemTitleStyle = {
    fontWeight: '600',
    fontSize: '1.25rem',
    color: '#2D3748',
    marginBottom: '0.5rem',
};

const dashboardItemDescriptionStyle = {
    color: '#4A5568',
    fontSize: '0.875rem',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
};

const dashboardItemFooterStyle = {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

const dashboardItemPointsStyle = {
    color: '#3182CE', // Blue-600
    fontWeight: 'bold',
};

const dashboardItemStatusStyle = {
    fontSize: '0.875rem',
    fontWeight: '500',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px', // Full rounded
};

const formGridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr', // Default to single column
    gap: '1.5rem',
};

// Responsive form grid styles
const formGridStyleDesktop = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr', // Two columns on desktop
    gap: '1.5rem',
    width: '100%',
    minWidth: 0,
};

const formGridStyleMobile = {
    display: 'grid',
    gridTemplateColumns: '1fr', // Single column on mobile
    gap: '1rem',
    width: '100%',
    minWidth: 0,
};

const itemDetailContainerStyle = {
    backgroundColor: '#FFFFFF',
    borderRadius: '0.75rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '2rem',
    display: 'grid',
    gridTemplateColumns: '1fr', // Default to single column
    gap: '2.5rem',
};

// Media query for itemDetailContainerStyle
if (window.innerWidth >= 768) { // md breakpoint
    itemDetailContainerStyle.gridTemplateColumns = '1fr 1fr';
}

const itemImageGalleryStyle = {
    // md:col-span-1
};

const itemMainImageStyle = {
    width: '100%',
    height: '24rem', // h-96
    objectFit: 'cover',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '1rem',
};

const itemThumbnailsStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '0.5rem',
};

const itemThumbnailStyle = {
    width: '100%',
    height: '6rem', // h-24
    objectFit: 'cover',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    opacity: 0.9,
    transition: 'opacity 0.15s ease-in-out',
};

const itemDetailsContentStyle = {
    // md:col-span-1
};

const itemTitleStyle = {
    fontSize: '2.25rem',
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: '1rem',
};

const itemDescriptionStyle = {
    color: '#4A5568',
    fontSize: '1.125rem',
    marginBottom: '1.5rem',
    lineHeight: '1.625',
};

const itemInfoBlockStyle = {
    marginBottom: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
};

const itemInfoTextStyle = {
    color: '#4A5568',
};

const itemPointsStatusStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EFF6FF', // Blue-50
    padding: '1rem',
    borderRadius: '0.5rem',
    marginBottom: '1.5rem',
    boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.05)',
};

const itemPointsValueStyle = {
    fontSize: '1.875rem',
    fontWeight: '800',
    color: '#2B6CB0', // Blue-700
};

const itemStatusBadgeStyle = {
    fontSize: '1.125rem',
    fontWeight: 'bold',
    padding: '0.5rem 1rem',
    borderRadius: '9999px', // Full rounded
};

const uploaderInfoStyle = {
    marginBottom: '1.5rem',
};

const uploaderInfoTitleStyle = {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: '0.5rem',
};

const uploaderInfoTextStyle = {
    color: '#4A5568',
};

const itemActionButtonsStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
};

const actionButtonStyle = {
    flex: 1,
    padding: '0.75rem 1.5rem',
    color: '#FFFFFF',
    borderRadius: '0.375rem',
    fontSize: '1.125rem',
    fontWeight: '600',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
    transition: 'background-color 0.15s ease-in-out',
};

const itemUnavailableMessageStyle = {
    fontSize: '0.875rem',
    color: '#EF4444', // Red-500
    marginTop: '1rem',
    textAlign: 'center',
};

// New/Updated Dashboard Specific Styles
const dashboardMainContentStyle = {
    flexGrow: 1,
    maxWidth: '72rem',
    margin: '0 auto',
    padding: '2rem 1.5rem', // Adjusted padding
};

const dashboardCardStyle = {
    backgroundColor: '#FFFFFF',
    borderRadius: '0.75rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '2rem', // Added margin-bottom
};

const outlineButtonStyle = {
    padding: '0.5rem 1rem',
    border: '1px solid #CBD5E0',
    borderRadius: '0.375rem',
    backgroundColor: '#FFFFFF',
    color: '#4A5568',
    cursor: 'pointer',
    transition: 'background-color 0.15s ease-in-out, border-color 0.15s ease-in-out',
};

const ghostButtonStyle = {
    padding: '0.5rem 1rem',
    background: 'none',
    border: 'none',
    color: '#4A5568',
    cursor: 'pointer',
    transition: 'background-color 0.15s ease-in-out',
};

const badgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#FFFFFF', // Default badge text color
};

const tabsContainerStyle = {
    marginBottom: '2rem',
};

const tabsListStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    backgroundColor: '#E2E8F0', // Gray-200
    borderRadius: '0.5rem',
    padding: '0.25rem',
    marginBottom: '1.5rem',
};

const tabsTriggerStyle = {
    padding: '0.75rem 1rem',
    borderRadius: '0.375rem',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '500',
    color: '#4A5568',
    transition: 'background-color 0.15s ease-in-out, color 0.15s ease-in-out',
};

const tabsTriggerActiveStyle = {
    backgroundColor: '#FFFFFF',
    color: '#2D3748',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
};

const tabsContentStyle = {
    // Styles for the content area of each tab
};

const statsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
    marginBottom: '1.5rem',
};

const filterGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', // Adjusted for filters
    gap: '1rem',
};

// Styles for EditProfilePage
const editProfileGridStyle = {
    display: 'grid',
    gap: '2rem',
    gridTemplateColumns: '1fr 2fr', // Always horizontal layout
    minHeight: 'fit-content',
};

// Responsive styles for smaller screens
const editProfileGridStyleMobile = {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
};

const cardHeaderStyle = {
    padding: '1.25rem', // p-5
    borderBottom: '1px solid #E2E8F0', // border-b
    fontSize: '1.125rem', // text-lg
    fontWeight: '600', // font-semibold
    color: '#2D3748', // text-gray-800
};

const actionButtonCircleStyle = {
    width: '2.5rem', // w-10
    height: '2.5rem', // h-10
    borderRadius: '9999px', // rounded-full
    backgroundColor: '#3182CE', // bg-primary
    color: '#FFFFFF', // text-white
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // shadow
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
    transition: 'background-color 0.15s ease-in-out',
};

const separatorStyle = {
    height: '1px',
    backgroundColor: '#E2E8F0', // border-gray-200
    width: '100%',
};

const toggleButtonStyle = {
    padding: '0.375rem 0.75rem', // px-3 py-1.5
    borderRadius: '0.375rem', // rounded-md
    fontSize: '0.875rem', // text-sm
    fontWeight: '500', // font-medium
    border: '1px solid transparent',
    cursor: 'pointer',
    transition: 'background-color 0.15s ease-in-out, color 0.15s ease-in-out, border-color 0.15s ease-in-out',
};

const headerTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#2D3748',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
};

const userIdStyle = {
    marginLeft: '1rem',
    fontSize: '0.875rem',
    color: '#718096',
};

const navButtonStyle = {
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '500',
    color: '#4A5568',
    transition: 'background-color 0.15s ease-in-out, color 0.15s ease-in-out',
};

const primaryNavButtonStyle = {
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    backgroundColor: '#3182CE',
    color: '#FFFFFF',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'background-color 0.15s ease-in-out',
};

const userEmailStyle = {
    fontSize: '0.875rem',
    color: '#4A5568',
    marginRight: '1rem',
};

const logoutButtonStyle = {
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    backgroundColor: '#EF4444', // Red-500
    color: '#FFFFFF',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'background-color 0.15s ease-in-out',
};

const flexRowWrapStyle = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '1rem',
    justifyContent: 'space-between', // Adjust as needed
    alignItems: 'flex-start', // Adjust as needed
};

// Keyframe for spinner animation
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = `
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
`;
document.head.appendChild(styleSheet);

// Define the base URL for your MERN backend API
// Make sure your backend server is running on this URL (e.g., http://localhost:5000)
const API_BASE_URL = 'http://localhost:5000/api';

// Create a context for User Auth and API interaction
const AuthContext = createContext(null);

// Auth Provider Component
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Will store { id, email } from backend
    const [token, setToken] = useState(localStorage.getItem('token')); // JWT token
    const [loading, setLoading] = useState(true); // Loading state for initial auth check

    // Function to fetch user data after login/registration or on app load
    const fetchUserData = async (authToken) => {
        console.log("[AuthContext] Attempting to fetch user data with token:", authToken ? "present" : "absent");
        if (!authToken) {
            setUser(null);
            setLoading(false);
            console.log("[AuthContext] No auth token found, user set to null.");
            return;
        }
        try {
            const response = await fetch(`${API_BASE_URL}/auth`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': authToken, // Send the JWT token
                },
            });
            const data = await response.json();
            if (response.ok) {
                // Backend /api/auth returns user object (e.g., { _id, email, points })
                setUser({ id: data._id, email: data.email, points: data.points, createdAt: data.createdAt });
                console.log("[AuthContext] User data fetched successfully:", { id: data._id, email: data.email });
            } else {
                console.error("[AuthContext] Failed to fetch user data:", data.msg);
                setUser(null);
                localStorage.removeItem('token'); // Clear invalid token
                setToken(null);
            }
        } catch (error) {
            console.error("[AuthContext] Error fetching user data:", error);
            setUser(null);
            localStorage.removeItem('token');
            setToken(null);
        } finally {
            setLoading(false);
            console.log("[AuthContext] Auth loading set to false.");
        }
    };

    useEffect(() => {
        // On initial load, try to re-authenticate using token from localStorage
        if (token) {
            fetchUserData(token);
        } else {
            setLoading(false); // No token, so not loading auth
            console.log("[AuthContext] No token in localStorage, auth loading set to false.");
        }
    }, [token]); // Re-run if token changes

    // Login function
    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                setToken(data.token);
                // Store role in user state
                setUser({ id: data.userId, email, role: data.role });
                // Fetch user data after successful login to populate user state
                await fetchUserData(data.token);
                console.log("[AuthContext] Login successful.");
                return { success: true, message: data.msg, role: data.role };
            } else {
                console.error("[AuthContext] Login failed:", data.msg);
                return { success: false, message: data.msg || 'Login failed' };
            }
        } catch (error) {
            console.error("[AuthContext] Login API error:", error);
            return { success: false, message: 'Network error or server unreachable' };
        } finally {
            setLoading(false);
        }
    };

    // Register function
    const register = async (email, password) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                setToken(data.token);
                // Fetch user data after successful registration
                await fetchUserData(data.token);
                console.log("[AuthContext] Registration successful.");
                return { success: true, message: data.msg };
            } else {
                console.error("[AuthContext] Registration failed:", data.msg);
                return { success: false, message: data.msg || 'Registration failed' };
            }
        } catch (error) {
            console.error("[AuthContext] Register API error:", error);
            return { success: false, message: 'Network error or server unreachable' };
        } finally {
            setLoading(false);
        }
    };

    // Logout function
    const logout = () => {
        console.log("[AuthContext] Logging out...");
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        console.log("[AuthContext] Token and user state cleared.");
    };

    // Provide the auth functions, user data, and loading state to children components
    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use AuthContext
const useAuth = () => {
    return useContext(AuthContext);
};

// --- Components for different pages ---

// Message Box Component (replaces alert/confirm)
const MessageBox = ({ message, onClose }) => {
    if (!message) return null;
    return (
        <div style={messageBoxOverlayStyle}>
            <div style={messageBoxContentStyle}>
                <p style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>{message}</p>
                <button
                    onClick={onClose}
                    style={messageBoxButtonStyle}
                >
                    OK
                </button>
            </div>
        </div>
    );
};

const LoginPage = ({ onLoginSuccess, onNavigate }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { login, setUser } = useAuth(); // Use the login function from AuthContext

    const handleLogin = async (e) => {
        e.preventDefault();
        const result = await login(email, password);
        if (result.success) {
            setMessage(result.message);
            if (result.role === 'admin') {
                onNavigate('admin-panel');
            } else {
                onLoginSuccess();
            }
        } else {
            setMessage(result.message);
        }
    };

    return (
        <div style={pageContainerStyle}>
            <div style={formCardStyle}>
                <h2 style={formTitleStyle}>Login to ReWear</h2>
                <form onSubmit={handleLogin} style={formStyle}>
                    <div>
                        <label htmlFor="email" style={labelStyle}>Email</label>
                        <input
                            type="email"
                            id="email"
                            style={inputStyle}
                            placeholder="your@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" style={labelStyle}>Password</label>
                        <input
                            type="password"
                            id="password"
                            style={inputStyle}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        style={primaryButtonStyle}
                    >
                        Login
                    </button>
                </form>
                <p style={formTextStyle}>
                    Don't have an account?{' '}
                    <button
                        onClick={() => onNavigate('register')}
                        style={linkButtonStyle}
                    >
                        Register here
                    </button>
                </p>
            </div>
            <MessageBox message={message} onClose={() => setMessage('')} />
        </div>
    );
};

const RegisterPage = ({ onRegisterSuccess, onNavigate }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const { register } = useAuth(); // Use the register function from AuthContext

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password.length < 6) { // Client-side password length validation
            setMessage("Password should be at least 6 characters long.");
            return;
        }
        if (password !== confirmPassword) {
            setMessage("Passwords do not match!");
            return;
        }
        const result = await register(email, password);
        if (result.success) {
            setMessage(result.message);
            onRegisterSuccess();
        } else {
            setMessage(result.message);
        }
    };

    return (
        <div style={pageContainerStyle}>
            <div style={formCardStyle}>
                <h2 style={formTitleStyle}>Register for ReWear</h2>
                <form onSubmit={handleRegister} style={formStyle}>
                    <div>
                        <label htmlFor="reg-email" style={labelStyle}>Email</label>
                        <input
                            type="email"
                            id="reg-email"
                            style={inputStyle}
                            placeholder="your@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="reg-password" style={labelStyle}>Password</label>
                        <input
                            type="password"
                            id="reg-password"
                            style={inputStyle}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="confirm-password" style={labelStyle}>Confirm Password</label>
                        <input
                            type="password"
                            id="confirm-password"
                            style={inputStyle}
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        style={secondaryButtonStyle}
                    >
                        Register
                    </button>
                </form>
                <p style={formTextStyle}>
                    Already have an account?{' '}
                    <button
                        onClick={() => onNavigate('login')}
                        style={linkButtonStyle}
                    >
                        Login here
                    </button>
                </p>
            </div>
            <MessageBox message={message} onClose={() => setMessage('')} />
        </div>
    );
};

const Header = ({ onNavigate, user, onLogout }) => {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768); // Adjust breakpoint as needed

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 768); // Update state on resize
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const headerDynamicStyle = {
        backgroundColor: '#FFFFFF',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        padding: '1rem 1.5rem',
        display: 'flex',
        flexDirection: isDesktop ? 'row' : 'column', // Horizontal on desktop, vertical on mobile
        justifyContent: 'space-between',
        alignItems: isDesktop ? 'center' : 'flex-start', // Align items based on direction
        borderRadius: '0 0 0.5rem 0.5rem',
        gap: isDesktop ? '0' : '1rem', // Gap for vertical stacking on mobile
    };

    const navDynamicStyle = {
        display: 'flex',
        flexDirection: isDesktop ? 'row' : 'column', // Horizontal on desktop, vertical on mobile
        alignItems: isDesktop ? 'center' : 'flex-start', // Align items based on direction
        gap: '1rem',
        width: isDesktop ? 'auto' : '100%', // Full width on mobile
        marginTop: isDesktop ? '0' : '1rem', // Margin for vertical stacking on mobile
    };

    return (
        <header style={headerDynamicStyle}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <button onClick={() => onNavigate('landing')} style={headerTitleStyle}>
                    ReWear
                </button>
                {/* Display userId for multi-user identification */}
                {user && user.id && (
                    <span style={{ ...userIdStyle, display: isDesktop ? 'block' : 'none' }}>
                        User ID: <span style={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>{user.id}</span>
                    </span>
                )}
            </div>
            <nav style={navDynamicStyle}>
                <button onClick={() => onNavigate('landing')} style={navButtonStyle}>Home</button>
                <button onClick={() => onNavigate('browse')} style={navButtonStyle}>Browse Items</button>
                {user ? (
                    <>
                        {/* Display user email */}
                        <span style={userEmailStyle}>{user.email}</span>
                        <button onClick={() => onNavigate('dashboard')} style={navButtonStyle}>Dashboard</button>
                        <button onClick={onLogout} style={logoutButtonStyle}>Logout</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => onNavigate('login')} style={navButtonStyle}>Login</button>
                        <button onClick={() => onNavigate('register')} style={primaryNavButtonStyle}>Sign Up</button>
                    </>
                )}
                {user && user.role === 'admin' && (
                    <button onClick={() => onNavigate('admin-panel')} style={navButtonStyle}>Admin Panel</button>
                )}
            </nav>
        </header>
    );
};

const Footer = () => {
    return (
        <footer style={footerStyle}>
            <div style={footerContentStyle}>
                <p style={{ fontSize: '0.875rem' }}>&copy; {new Date().getFullYear()} ReWear. All rights reserved.</p>
                <div style={footerLinksStyle}>
                    <a href="#" style={footerLinkStyle}>Privacy Policy</a>
                    <a href="#" style={footerLinkStyle}>Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

const LandingPage = ({ onNavigate }) => {
    const { user, logout } = useAuth();
    const handleLogoutClick = () => {
        logout(); // Call the logout function from AuthContext
        onNavigate('landing'); // Navigate to landing page after logout
    };

    return (
        <div style={appContainerStyle}>
            <Header onNavigate={onNavigate} user={user} onLogout={handleLogoutClick} />
            <main style={mainContentStyle}>
                {/* Hero Section */}
                <section style={heroSectionStyle}>
                    <div style={{ ...heroOverlayStyle, backgroundImage: "url('https://placehold.co/1200x600/000000/FFFFFF?text=Sustainable+Fashion')" }}></div>
                    <div style={heroContentStyle}>
                        <h1 style={heroTitleStyle}>
                            Exchange Unused Clothing, Embrace Sustainable Style
                        </h1>
                        <p style={heroSubtitleStyle}>
                            Join the ReWear community to swap or redeem pre-loved garments and reduce textile waste.
                        </p>
                        <div style={heroButtonsContainerStyle}>
                            <button
                                onClick={() => onNavigate('add-item')}
                                style={heroPrimaryButtonStyle}
                            >
                                Start Swapping
                            </button>
                            <button
                                onClick={() => onNavigate('browse')}
                                style={heroSecondaryButtonStyle}
                            >
                                Browse Items
                            </button>
                        </div>
                    </div>
                </section>

                {/* Featured Items Carousel (Placeholder) */}
                <section style={sectionStyle}>
                    <h2 style={sectionTitleStyle}>Featured Items</h2>
                    <div style={gridContainerStyle}>
                        {Array(4).fill(0).map((_, i) => (
                            <div key={i} style={cardStyle}>
                                <img src={`https://placehold.co/400x300/E0E7FF/3B82F6?text=Item+${i+1}`} alt={`Featured Item ${i+1}`} style={cardImageStyle} />
                                <div style={cardContentStyle}>
                                    <h3 style={cardTitleStyle}>Stylish Jacket</h3>
                                    <p style={cardDescriptionStyle}>Lightly used, perfect for spring.</p>
                                    <div style={cardFooterStyle}>
                                        <span style={cardPointsStyle}>50 Points</span>
                                        <button style={cardButtonStyle}>View Details</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Categories Section (Placeholder) */}
                <section style={altSectionStyle}>
                    <h2 style={sectionTitleStyle}>Shop by Category</h2>
                    <div style={categoryGridStyle}>
                        {['Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Accessories', 'Footwear'].map((category, i) => (
                            <div key={i} style={categoryCardStyle}>
                                <img src={`https://placehold.co/100x100/A78BFA/FFFFFF?text=${category.charAt(0)}`} alt={category} style={categoryImageStyle} />
                                <h3 style={categoryTitleStyle}>{category}</h3>
                            </div>
                        ))}
                    </div>
                </section>

                {/* How It Works / Impact Metrics (Optional) */}
                <section style={sectionStyle}>
                    <h2 style={sectionTitleStyle}>How ReWear Works</h2>
                    <div style={howItWorksGridStyle}>
                        <div style={howItWorksCardStyle}>
                            <div style={howItWorksIconStyle}>👕</div>
                            <h3 style={howItWorksTitleStyle}>List Your Items</h3>
                            <p style={howItWorksDescriptionStyle}>Upload photos and details of your unused clothing.</p>
                        </div>
                        <div style={howItWorksCardStyle}>
                            <div style={howItWorksIconStyle}>🔄</div>
                            <h3 style={howItWorksTitleStyle}>Swap or Redeem</h3>
                            <p style={howItWorksDescriptionStyle}>Exchange directly or use points to get new-to-you clothes.</p>
                        </div>
                        <div style={howItWorksCardStyle}>
                            <div style={howItWorksIconStyle}>🌍</div>
                            <h3 style={howItWorksTitleStyle}>Sustainable Impact</h3>
                            <p style={howItWorksDescriptionStyle}>Reduce waste and contribute to a greener planet.</p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

const Dashboard = ({ onNavigate }) => {
    const { user, token, logout } = useAuth();
    const [listings, setListings] = useState([]);
    const [purchases, setPurchases] = useState([]);
    const [points, setPoints] = useState(0);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('items'); // State for tabs

    useEffect(() => {
        const fetchDashboardData = async () => {
            if (!user || !token || !user.id) {
                setLoading(false);
                return;
            }
            setLoading(true);
            try {
                // Fetch user points
                const pointsResponse = await fetch(`${API_BASE_URL}/users/${user.id}/points`, {
                    headers: { 'x-auth-token': token },
                });
                const pointsData = await pointsResponse.json();
                if (pointsResponse.ok) {
                    setPoints(pointsData.points || 0);
                } else {
                    setMessage(`Failed to load points: ${pointsData.msg}`);
                }
            } catch (error) {
                console.error("Error fetching user points:", error);
                setMessage("Network error fetching points.");
            }

            // Fetch 'My Listings'
            try {
                const listingsResponse = await fetch(`${API_BASE_URL}/users/${user.id}/listings`, {
                    headers: { 'x-auth-token': token },
                });
                const listingsData = await listingsResponse.json();
                if (listingsResponse.ok) {
                    setListings(listingsData);
                } else {
                    setMessage(`Failed to load listings: ${listingsData.msg}`);
                }
            } catch (error) {
                console.error("Error fetching user listings:", error);
                setMessage("Network error fetching listings.");
            }

            // Fetch 'My Purchases'
            try {
                const purchasesResponse = await fetch(`${API_BASE_URL}/users/${user.id}/purchases`, {
                    headers: { 'x-auth-token': token },
                });
                const purchasesData = await purchasesResponse.json();
                if (purchasesResponse.ok) {
                    setPurchases(purchasesData);
                } else {
                    setMessage(`Failed to load purchases: ${purchasesData.msg}`);
                }
            } catch (error) {
                console.error("Error fetching user purchases:", error);
                setMessage("Network error fetching purchases.");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [user, token]); // Depend on user and token to refetch when they change

    if (loading) {
        return (
            <div style={pageContainerStyle}>
                <div style={spinnerStyle}></div>
                <p style={{ fontSize: '1.25rem', color: '#4A5568', marginLeft: '1rem' }}>Loading dashboard...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div style={pageContainerStyle}>
                <p style={{ fontSize: '1.25rem', color: '#4A5568' }}>Please log in to view your dashboard.</p>
            </div>
        );
    }

    const handleLogoutClick = () => {
        logout(); // Call the logout function from AuthContext
        onNavigate('landing'); // Navigate to landing page after logout
    };

    return (
        <div style={appContainerStyle}>
            <Header onNavigate={onNavigate} user={user} onLogout={handleLogoutClick} />

            <main style={dashboardMainContentStyle}>
                <div style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#2D3748' }}>My Dashboard</h1>
                    <p style={{ color: '#718096' }}>Manage your ReWear account and track your activity</p>
                </div>

                {/* Profile Overview - Horizontal Layout */}
                <div style={{ ...dashboardCardStyle, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '2rem', padding: '1.5rem', flexWrap: 'wrap' }}>
                    <div style={userAvatarStyle}>
                        {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
                    </div>

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2D3748' }}>{user.email || 'Guest User'}</h2>
                        <p style={{ color: '#718096' }}>Member since {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
                        <p style={{ color: '#718096', fontSize: '0.875rem' }}>User ID: <span style={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>{user.id}</span></p>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', paddingTop: '0.5rem', flexWrap: 'wrap' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3182CE' }}>{points}</div>
                                <div style={{ fontSize: '0.875rem', color: '#718096' }}>Points</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
                                    <Star style={{ width: '1rem', height: '1rem', fill: '#F6E05E', color: '#F6E05E' }} />
                                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>N/A</span> {/* Rating not implemented */}
                                </div>
                                <div style={{ fontSize: '0.875rem', color: '#718096' }}>Rating</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{listings.length}</div> {/* Total items listed */}
                                <div style={{ fontSize: '0.875rem', color: '#718096' }}>Items Listed</div>
                            </div>
                        </div>
                    </div>

                    <button onClick={() => onNavigate('edit-profile')} style={{ ...outlineButtonStyle, alignSelf: 'flex-end' }}>
                        <Edit style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
                        Edit Profile
                    </button>
                </div>

                {/* Tabs */}
                <div style={tabsContainerStyle}>
                    <div style={tabsListStyle}>
                        <button
                            onClick={() => setActiveTab('items')}
                            style={{ ...tabsTriggerStyle, ...(activeTab === 'items' && tabsTriggerActiveStyle) }}
                        >
                            My Items
                        </button>
                        <button
                            onClick={() => setActiveTab('swaps')}
                            style={{ ...tabsTriggerStyle, ...(activeTab === 'swaps' && tabsTriggerActiveStyle) }}
                        >
                            Swap History
                        </button>
                        <button
                            onClick={() => setActiveTab('points')}
                            style={{ ...tabsTriggerStyle, ...(activeTab === 'points' && tabsTriggerActiveStyle) }}
                        >
                            Points History
                        </button>
                        <button
                            onClick={() => setActiveTab('ratings')}
                            style={{ ...tabsTriggerStyle, ...(activeTab === 'ratings' && tabsTriggerActiveStyle) }}
                        >
                            Ratings
                        </button>
                        <button
                            onClick={() => setActiveTab('notifications')}
                            style={{ ...tabsTriggerStyle, ...(activeTab === 'notifications' && tabsTriggerActiveStyle) }}
                        >
                            Notifications
                        </button>
                        <button
                            onClick={() => setActiveTab('stats')}
                            style={{ ...tabsTriggerStyle, ...(activeTab === 'stats' && tabsTriggerActiveStyle) }}
                        >
                            Statistics
                        </button>
                    </div>

                    {/* My Items Tab Content */}
                    {activeTab === 'items' && (
                        <div style={tabsContentStyle}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>My Listed Items</h3>
                                <button onClick={() => onNavigate('add-item')} style={primaryButtonStyle}>
                                    <Plus style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
                                    List New Item
                                </button>
                            </div>

                            {listings.length === 0 ? (
                                <div style={emptyStateCardStyle}>
                                    <p style={{ marginBottom: '1rem' }}>You haven't listed any items yet.</p>
                                    <button
                                        onClick={() => onNavigate('add-item')}
                                        style={emptyStateButtonStyle}
                                    >
                                        List Your First Item
                                    </button>
                                </div>
                            ) : (
                                <div style={dashboardGridStyle}>
                                    {listings.map((item) => (
                                        <div key={item._id} style={dashboardItemCardStyle}>
                                            <div style={{ position: 'relative' }}>
                                                <img
                                                    src={item.imageUrl || `https://placehold.co/400x300/E0E7FF/3B82F6?text=${item.title}`}
                                                    alt={item.title}
                                                    style={dashboardItemImageStyle}
                                                />
                                                <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem' }}>
                                                    <span style={{ 
                                                        ...badgeStyle, 
                                                        backgroundColor: 
                                                            item.status === 'approved' ? '#48BB78' : 
                                                            item.status === 'pending' ? '#F6AD55' : 
                                                            item.status === 'rejected' ? '#F56565' : 
                                                            '#E2E8F0'
                                                    }}>
                                                        {item.status === 'approved' ? 'Approved' :
                                                         item.status === 'pending' ? 'Pending Review' :
                                                         item.status === 'rejected' ? 'Rejected' :
                                                         item.status || 'Unknown'}
                                                    </span>
                                                </div>
                                            </div>

                                            <div style={dashboardItemContentStyle}>
                                                <div>
                                                    <h4 style={{ fontWeight: '600' }}>{item.title}</h4>
                                                    <p style={{ fontSize: '0.875rem', color: '#718096' }}>{item.category} • {item.condition}</p>
                                                </div>

                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                                                    <span style={{ fontWeight: 'bold', color: '#3182CE' }}>{item.points} pts</span>
                                                    <div style={{ fontSize: '0.875rem', color: '#718096' }}>
                                                        {/* Placeholder for views/likes if not in backend */}
                                                        N/A views • N/A likes
                                                    </div>
                                                </div>

                                                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                                                    <button style={{ ...outlineButtonStyle, flex: 1 }}>
                                                        Edit
                                                    </button>
                                                    <button onClick={() => onNavigate('item-detail', { itemId: item._id })} style={{ ...ghostButtonStyle, flex: 1 }}>
                                                        View
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Swap History Tab Content */}
                    {activeTab === 'swaps' && (
                        <div style={tabsContentStyle}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>Recent Activity</h3>

                            {purchases.length === 0 ? (
                                <div style={emptyStateCardStyle}>
                                    <p>You haven't acquired any items yet.</p>
                                    <button
                                        onClick={() => onNavigate('browse')}
                                        style={emptyStateButtonStyle}
                                    >
                                        Browse Items to Swap
                                    </button>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {purchases.map((transaction) => (
                                        <div key={transaction._id} style={dashboardCardStyle}>
                                            <div style={{ padding: '1rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                        <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: transaction.type === 'swap' ? '#EBF8FF' : '#FFF5F5' }}>
                                                            {transaction.type === 'swap' ?
                                                                <RefreshCw style={{ width: '1.25rem', height: '1.25rem', color: '#3182CE' }} /> :
                                                                <TrendingUp style={{ width: '1.25rem', height: '1.25rem', color: '#F56565' }} />
                                                            }
                                                        </div>
                                                        <div>
                                                            <h4 style={{ fontWeight: '500' }}>
                                                                {transaction.type === 'swap' ? 'Swapped' : 'Redeemed'} {transaction.title}
                                                            </h4>
                                                            <p style={{ fontSize: '0.875rem', color: '#718096' }}>
                                                                {transaction.type === 'swap' ? 'with' : 'from'} {transaction.uploaderEmail} • {new Date(transaction.acquiredAt).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div style={{ textAlign: 'right' }}>
                                                        <span style={{ ...badgeStyle, backgroundColor: transaction.status === 'completed' ? '#48BB78' : '#F6E05E' }}>
                                                            {transaction.status}
                                                        </span>
                                                        {transaction.points !== 0 && (
                                                            <p style={{ fontSize: '0.875rem', fontWeight: '500', color: transaction.points > 0 ? '#38A169' : '#E53E3E' }}>
                                                                {transaction.points > 0 ? '+' : ''}{transaction.points} pts
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Points History Tab Content */}
                    {activeTab === 'points' && (
                        <div style={tabsContentStyle}>
                            <PointsHistory />
                        </div>
                    )}

                    {/* Ratings Tab Content */}
                    {activeTab === 'ratings' && (
                        <div style={tabsContentStyle}>
                            <RatingsPage />
                        </div>
                    )}

                    {/* Notifications Tab Content (Placeholder) */}
                    {activeTab === 'notifications' && (
                        <div style={tabsContentStyle}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>My Notifications</h3>
                            <div style={emptyStateCardStyle}>
                                <p style={{ marginBottom: '1rem' }}>No new notifications.</p>
                                <p style={{ fontSize: '0.875rem', color: '#718096' }}>
                                    You'll receive updates here about swap requests, status changes, and new ratings.
                                </p>
                            </div>
                            {/* Example of a notification item - you'd fetch these from backend */}
                            {/*
                            <div style={dashboardCardStyle}>
                                <div style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <Bell style={{ width: '1.5rem', height: '1.5rem', color: '#3182CE' }} />
                                    <div>
                                        <h4 style={{ fontWeight: '500' }}>Swap Request Accepted!</h4>
                                        <p style={{ fontSize: '0.875rem', color: '#718096' }}>Your request for "Vintage T-Shirt" was accepted by Jane Doe. View details.</p>
                                        <span style={{ fontSize: '0.75rem', color: '#A0AEC0' }}>2 hours ago</span>
                                    </div>
                                </div>
                            </div>
                            */}
                        </div>
                    )}

                    {/* Statistics Tab Content */}
                    {activeTab === 'stats' && (
                        <div style={tabsContentStyle}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>Your Impact</h3>

                            <div style={statsGridStyle}>
                                <div style={dashboardCardStyle}>
                                    <div style={{ padding: '1rem' }}>
                                        <h4 style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                                            <Package style={{ width: '1.25rem', height: '1.25rem', color: '#3182CE' }} />
                                            Items Shared
                                        </h4>
                                        <div style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>{listings.length}</div>
                                        <p style={{ fontSize: '0.875rem', color: '#718096', marginTop: '0.25rem' }}>Total items listed</p>
                                    </div>
                                </div>

                                <div style={dashboardCardStyle}>
                                    <div style={{ padding: '1rem' }}>
                                        <h4 style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                                            <RefreshCw style={{ width: '1.25rem', height: '1.25rem', color: '#38A169' }} />
                                            Successful Swaps
                                        </h4>
                                        <div style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>{purchases.length}</div> {/* Assuming all purchases are successful swaps/redeems */}
                                        <p style={{ fontSize: '0.875rem', color: '#718096', marginTop: '0.25rem' }}>Items exchanged</p>
                                    </div>
                                </div>

                                <div style={dashboardCardStyle}>
                                    <div style={{ padding: '1rem' }}>
                                        <h4 style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                                            <TrendingUp style={{ width: '1.25rem', height: '1.25rem', color: '#F6AD55' }} />
                                            CO₂ Saved
                                        </h4>
                                        <div style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>{purchases.length * 1.5}kg</div> {/* Placeholder calculation */}
                                        <p style={{ fontSize: '0.875rem', color: '#718096', marginTop: '0.25rem' }}>Carbon footprint reduced</p>
                                    </div>
                                </div>
                            </div>

                            <div style={dashboardCardStyle}>
                                <div style={{ padding: '1.5rem' }}>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Monthly Activity</h3>
                                    <div style={{ textAlign: 'center', padding: '2rem 0', color: '#718096' }}>
                                        <TrendingUp style={{ width: '3rem', height: '3rem', margin: '0 auto 1rem', opacity: 0.5 }} />
                                        <p>Activity chart would go here</p>
                                        <p style={{ fontSize: '0.875rem' }}>Track your swapping progress over time</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
            <MessageBox message={message} onClose={() => setMessage('')} />
        </div>
    );
};


const BrowseItemsPage = ({ onNavigate }) => {
    const { user, token, logout } = useAuth();
    const [items, setItems] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedSize, setSelectedSize] = useState("all");
    const [selectedCondition, setSelectedCondition] = useState("all");
    const [likedItems, setLikedItems] = useState([]); // Client-side only for now

    const categories = ['Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Accessories', 'Footwear'];
    const conditions = ['New with tags', 'Like new', 'Good', 'Fair'];

    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            try {
                const headers = { 'Content-Type': 'application/json' };
                if (token) {
                    headers['x-auth-token'] = token;
                }
                const response = await fetch(`${API_BASE_URL}/items`, { headers });
                const data = await response.json();
                if (response.ok) {
                    // Backend already filters by status 'available' and excludes current user's items
                    setItems(data);
                } else {
                    setMessage(`Failed to load items: ${data.msg}`);
                }
            } catch (error) {
                console.error("Error fetching items:", error);
                setMessage("Network error fetching items.");
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, [user, token]); // Re-fetch items if user or token changes

    const filteredItems = items.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
        const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
        const matchesSize = selectedSize === "all" || item.size.toLowerCase().includes(selectedSize.toLowerCase()); // Changed for text input
        const matchesCondition = selectedCondition === "all" || item.condition === selectedCondition;

        return matchesSearch && matchesCategory && matchesSize && matchesCondition;
    });

    const toggleLike = (itemId) => {
        setLikedItems(prev =>
            prev.includes(itemId)
                ? prev.filter(id => id !== itemId)
                : [...prev, itemId]
        );
    };

    const handleLogoutClick = () => {
        logout(); // Call the logout function from AuthContext
        onNavigate('landing'); // Navigate to landing page after logout
    };

    if (loading) {
        return (
            <div style={pageContainerStyle}>
                <div style={spinnerStyle}></div>
                <p style={{ fontSize: '1.25rem', color: '#4A5568', marginLeft: '1rem' }}>Loading items...</p>
            </div>
        );
    }

    return (
        <div style={appContainerStyle}>
            <Header onNavigate={onNavigate} user={user} onLogout={handleLogoutClick} />

            <main style={mainContentStyle}>
                <div style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#2D3748' }}>Browse Items</h1>
                    <p style={{ color: '#718096' }}>Discover amazing preloved fashion pieces from our community</p>
                </div>

                {/* Search and Filters */}
                <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ position: 'relative', display: 'flex', flex: 1 }}>
                        <Search style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#718096', width: '1rem', height: '1rem' }} />
                        <input
                            type="text"
                            placeholder="Search items, tags, or descriptions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ ...inputStyle, paddingLeft: '2.5rem' }}
                        />
                    </div>
                    {/* Filters button - can be expanded to a modal/sidebar for more filters */}
                    <button style={{ ...outlineButtonStyle, alignSelf: 'flex-start', width: 'auto', padding: '0.5rem 1rem' }}>
                        <Filter style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
                        Filters
                    </button>

                    <div style={filterGridStyle}>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            style={inputStyle}
                        >
                            <option value="all">All Categories</option>
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>

                        <input // Changed from select to input for size
                            type="text"
                            placeholder="Size (e.g., M, 32)"
                            value={selectedSize === "all" ? "" : selectedSize}
                            onChange={(e) => setSelectedSize(e.target.value)}
                            style={inputStyle}
                        />

                        <select
                            value={selectedCondition}
                            onChange={(e) => setSelectedCondition(e.target.value)}
                            style={inputStyle}
                        >
                            <option value="all">All Conditions</option>
                            {conditions.map(cond => <option key={cond} value={cond}>{cond}</option>)}
                        </select>

                        <button
                            style={ghostButtonStyle}
                            onClick={() => {
                                setSearchTerm("");
                                setSelectedCategory("all");
                                setSelectedSize("all");
                                setSelectedCondition("all");
                            }}
                        >
                            Clear All
                        </button>
                    </div>
                </div>

                {/* Items Grid */}
                <div style={horizontalGridStyle} className="horizontal-scroll">
                    {filteredItems.map((item) => (
                        <div key={item._id} style={horizontalCardStyle}>
                            <div style={{ position: 'relative', overflow: 'hidden' }}>
                                <img
                                    src={item.imageUrl || `https://placehold.co/400x300/E0E7FF/3B82F6?text=${item.title}`}
                                    alt={item.title}
                                    style={cardImageStyle}
                                />
                                {/* Like Button - client-side only */}
                                <button
                                    style={{ ...ghostButtonStyle, position: 'absolute', top: '0.75rem', right: '0.75rem', width: '2.5rem', height: '2.5rem', borderRadius: '9999px', backgroundColor: 'rgba(255,255,255,0.9)' }}
                                    onClick={() => toggleLike(item._id)}
                                >
                                    <Heart
                                        style={{
                                            width: '1rem',
                                            height: '1rem',
                                            fill: likedItems.includes(item._id) ? '#EF4444' : 'none',
                                            color: likedItems.includes(item._id) ? '#EF4444' : '#4A5568'
                                        }}
                                    />
                                </button>
                                <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem' }}>
                                    <span style={{ ...badgeStyle, backgroundColor: '#FFFFFF', color: '#4A5568' }}>
                                        {item.condition}
                                    </span>
                                </div>
                                <div style={{ position: 'absolute', bottom: '0.75rem', left: '0.75rem' }}>
                                    <span style={{ ...badgeStyle, backgroundColor: '#3182CE' }}>
                                        {item.status}
                                    </span>
                                </div>
                            </div>

                            <div style={cardContentStyle}>
                                <div>
                                    <h3 style={cardTitleStyle}>{item.title}</h3>
                                    <p style={cardDescriptionStyle}>{item.category} • Size {item.size}</p>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                        <Star style={{ width: '1rem', height: '1rem', fill: '#F6E05E', color: '#F6E05E' }} />
                                        <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>N/A</span> {/* Rating not implemented */}
                                        <span style={{ fontSize: '0.875rem', color: '#718096' }}>by {item.uploaderEmail || 'N/A'}</span>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <span style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#3182CE' }}>{item.points}</span>
                                        <span style={{ fontSize: '0.875rem', color: '#718096' }}> pts</span>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginTop: '0.5rem' }}>
                                    {item.tags && item.tags.map(tag => (
                                        <span key={tag} style={{ ...badgeStyle, backgroundColor: '#E2E8F0', color: '#4A5568' }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '0.5rem' }}>
                                    <button onClick={() => onNavigate('item-detail', { itemId: item._id })} style={{ ...primaryButtonStyle, flex: 1 }}>
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredItems.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                        <p style={{ color: '#718096', fontSize: '1.125rem' }}>No items found matching your criteria</p>
                        <button
                            style={{ ...outlineButtonStyle, marginTop: '1rem' }}
                            onClick={() => {
                                setSearchTerm("");
                                setSelectedCategory("all");
                                setSelectedSize("all");
                                setSelectedCondition("all");
                            }}
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </main>

            <Footer />
            <MessageBox message={message} onClose={() => setMessage('')} />
        </div>
    );
};


const AddNewItemPage = ({ onNavigate }) => {
    const { user, token, logout } = useAuth(); // Destructure user and token from useAuth
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [size, setSize] = useState(''); // Changed to text input
    const [condition, setCondition] = useState('');
    const [tags, setTags] = useState('');
    const [points, setPoints] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const categories = ['Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Accessories', 'Footwear'];
    const conditions = ['New with tags', 'Like new', 'Good', 'Fair'];
    // Removed sizes array as it's now a text input

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user || !token || !user.id) {
            setMessage("You must be logged in to list an item.");
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/items`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
                body: JSON.stringify({
                    title,
                    description,
                    category,
                    type,
                    size,
                    condition,
                    tags: tags,
                    points: parseInt(points),
                    imageUrl: imageUrl,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage('Item submitted for admin approval! It will be visible to the community once approved.');
                setTitle(''); setDescription(''); setCategory(''); setType(''); setSize('');
                setCondition(''); setTags(''); setPoints(''); setImageUrl('');
                onNavigate('dashboard');
            } else {
                setMessage(`Failed to list item: ${data?.msg || 'Unknown error'}`);
            }
        } catch (error) {
            setMessage("Network error listing item. Please check your connection or try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('image', file);

        setLoading(true);
        setMessage('');
        try {
            const response = await fetch(`${API_BASE_URL}/upload`, {
                method: 'POST',
                headers: {
                    'x-auth-token': token
                },
                body: formData
            });
            const data = await response.json();
            if (response.ok) {
                setImageUrl(data.imageUrl);
                setMessage('Image uploaded successfully!');
            } else {
                setMessage(data.msg || 'Image upload failed');
            }
        } catch (error) {
            setMessage('Image upload error');
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div style={pageContainerStyle}>
                <p style={{ fontSize: '1.25rem', color: '#4A5568' }}>Please log in to list an item.</p>
            </div>
        );
    }

    const handleLogoutClick = () => {
        logout(); // Call the logout function from AuthContext
        onNavigate('landing'); // Navigate to landing page after logout
    };

    return (
        <div style={appContainerStyle}>
            <Header onNavigate={onNavigate} user={user} onLogout={handleLogoutClick} />
            <main style={{ ...mainContentStyle, padding: '3rem 1.5rem' }}>
                <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#2D3748', marginBottom: '2rem', textAlign: 'center' }}>List a New Item</h1>
                <div style={formCardStyle}>
                    <form onSubmit={handleSubmit} style={formStyle}>
                        <div>
                            <label htmlFor="title" style={labelStyle}>Title</label>
                            <input
                                type="text"
                                id="title"
                                style={inputStyle}
                                placeholder="e.g., Blue Denim Jacket"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="description" style={labelStyle}>Description</label>
                            <textarea
                                id="description"
                                rows="4"
                                style={inputStyle}
                                placeholder="Describe your item, its features, and any unique aspects."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <div style={formGridStyle}>
                            <div>
                                <label htmlFor="category" style={labelStyle}>Category</label>
                                <select
                                    id="category"
                                    style={inputStyle}
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                >
                                    <option value="">Select a category</option>
                                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="type" style={labelStyle}>Type (e.g., Shirt, Jeans)</label>
                                <input
                                    type="text"
                                    id="type"
                                    style={inputStyle}
                                    placeholder="e.g., T-Shirt, Skinny Jeans"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="size" style={labelStyle}>Size (e.g., M, L, 34, 32)</label>
                                <input // Changed from select to input
                                    type="text"
                                    id="size"
                                    style={inputStyle}
                                    placeholder="e.g., M, L, 34, 32"
                                    value={size}
                                    onChange={(e) => setSize(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="condition" style={labelStyle}>Condition</label>
                                <select
                                    id="condition"
                                    style={inputStyle}
                                    value={condition}
                                    onChange={(e) => setCondition(e.target.value)}
                                    required
                                >
                                    <option value="">Select condition</option>
                                    {conditions.map(cond => <option key={cond} value={cond}>{cond}</option>)}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="tags" style={labelStyle}>Tags (comma-separated)</label>
                                <input
                                    type="text"
                                    id="tags"
                                    style={inputStyle}
                                    placeholder="e.g., casual, summer, cotton"
                                    value={tags}
                                    onChange={(e) => setTags(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="points" style={labelStyle}>Points Value</label>
                                <input
                                    type="number"
                                    id="points"
                                    style={inputStyle}
                                    placeholder="e.g., 50"
                                    value={points}
                                    onChange={(e) => setPoints(e.target.value)}
                                    required
                                    min="1"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="imageUpload" style={labelStyle}>Upload Image</label>
                            <input
                                type="file"
                                id="imageUpload"
                                accept="image/*"
                                style={{ ...inputStyle, padding: 0 }}
                                onChange={handleImageChange}
                            />
                            {imageUrl && (
                                <img src={imageUrl} alt="Preview" style={{ marginTop: '0.5rem', maxWidth: '200px', borderRadius: '0.5rem' }} />
                            )}
                            <p style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '0.25rem' }}>Choose an image from your device to upload.</p>
                        </div>
                        <button
                            type="submit"
                            style={primaryButtonStyle}
                            disabled={loading}
                        >
                            {loading ? 'Submitting...' : 'List Item'}
                        </button>
                    </form>
                </div>
            </main>
            <Footer />
            <MessageBox message={message} onClose={() => setMessage('')} />
        </div>
    );
};

const ItemDetailPage = ({ onNavigate, itemId }) => {
    const { user, token, logout } = useAuth(); // Destructure user and token from useAuth
    const [item, setItem] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [isLiked, setIsLiked] = useState(false); // State for like button
    const [currentImageIndex, setCurrentImageIndex] = useState(0); // State for image carousel
    // In ItemDetailPage, after successful redemption, show a review modal
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [reviewRating, setReviewRating] = useState(4);
    const [reviewComment, setReviewComment] = useState("");

    useEffect(() => {
        const fetchItemDetails = async () => {
            if (!itemId) {
                setLoading(false);
                return;
            }
            try {
                const response = await fetch(`${API_BASE_URL}/items/${itemId}`);
                const data = await response.json();
                if (response.ok) {
                    setItem(data);
                    // Assuming item.images is an array of URLs from backend
                    // If backend only sends one URL, you might need to adjust
                    setCurrentImageIndex(0); // Reset image index when item changes
                } else {
                    setMessage(`Item not found: ${data.msg}`);
                    setItem(null);
                }
            } catch (error) {
                console.error("Error fetching item details:", error);
                setMessage("Network error fetching item details.");
            } finally {
                setLoading(false);
            }
        };

        fetchItemDetails();
    }, [itemId]);

    const handleSwapOrRedeem = async (action) => {
        setLoading(true);
        setMessage("");
        try {
            if (action === 'redeem') {
                const response = await fetch(`${API_BASE_URL}/items/${item._id}/redeem`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': token,
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setItem({ ...item, status: 'redeemed', acquiredBy: user.id, acquiredAt: new Date() });
                    setMessage(data.msg || 'Item redeemed successfully!');
                    setShowReviewModal(true); // Show review modal after redeem
                } else {
                    setMessage(data.msg || 'Redemption failed.');
                }
            }
            // ... existing swap logic ...
        } catch (err) {
            setMessage('Redemption failed.');
        }
        setLoading(false);
    };

    const handleMessage = () => {
        setMessage("Your message has been sent to the uploader!");
    };


    if (loading) {
        return (
            <div style={pageContainerStyle}>
                <div style={spinnerStyle}></div>
                <p style={{ fontSize: '1.25rem', color: '#4A5568', marginLeft: '1rem' }}>Loading item details...</p>
            </div>
        );
    }

    if (!item) {
        return (
            <div style={appContainerStyle}>
                <Header onNavigate={onNavigate} user={user} onLogout={logout} />
                <main style={{ ...mainContentStyle, padding: '3rem 1.5rem', textAlign: 'center' }}>
                    <p style={{ fontSize: '1.5rem', color: '#EF4444', fontWeight: '600' }}>{message || "Item not found."}</p>
                    <button onClick={() => onNavigate('browse')} style={{ ...primaryButtonStyle, marginTop: '1.5rem' }}>
                        Back to Browse
                    </button>
                </main>
                <Footer />
                <MessageBox message={message} onClose={() => setMessage('')} />
            </div>
        );
    }

    const handleLogoutClick = () => {
        logout(); // Call the logout function from AuthContext
        onNavigate('landing'); // Navigate to landing page after logout
    };

    // Determine the image(s) to display. If item.images is an array, use it. Otherwise, use item.imageUrl.
    const displayImages = item.images && item.images.length > 0 ? item.images : (item.imageUrl ? [item.imageUrl] : []);

    return (
        <div style={appContainerStyle}>
            <Header onNavigate={onNavigate} user={user} onLogout={handleLogoutClick} />
            <main style={{ ...mainContentStyle, padding: '3rem 1.5rem' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <button onClick={() => onNavigate('browse')} style={{ ...ghostButtonStyle, display: 'inline-flex', alignItems: 'center', color: '#718096' }}>
                        <ArrowLeft style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
                        Back to Browse
                    </button>
                </div>

                <div style={itemDetailContainerStyle}>
                    {/* Images */}
                    <div style={itemImageGalleryStyle}>
                        <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '0.5rem' }}>
                            <img
                                src={displayImages[currentImageIndex] || `https://placehold.co/600x400/E0E7FF/3B82F6?text=${item.title}`}
                                alt={item.title}
                                style={itemMainImageStyle}
                            />
                            <button
                                style={{ ...ghostButtonStyle, position: 'absolute', top: '1rem', right: '1rem', width: '2.5rem', height: '2.5rem', borderRadius: '9999px', backgroundColor: 'rgba(255,255,255,0.9)' }}
                                onClick={() => setIsLiked(!isLiked)}
                            >
                                <Heart
                                    style={{
                                        width: '1rem',
                                        height: '1rem',
                                        fill: isLiked ? '#EF4444' : 'none',
                                        color: isLiked ? '#EF4444' : '#4A5568'
                                    }}
                                />
                            </button>
                            <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                                <span style={{ ...badgeStyle, backgroundColor: item.status === 'available' ? '#48BB78' : '#F6AD55' }}>
                                    {item.status || 'N/A'}
                                </span>
                            </div>
                        </div>

                        {/* Thumbnail Images */}
                        {displayImages.length > 1 && (
                            <div style={itemThumbnailsStyle}>
                                {displayImages.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        style={{
                                            flexShrink: 0,
                                            width: '5rem', // w-20
                                            height: '5rem', // h-20
                                            borderRadius: '0.5rem',
                                            overflow: 'hidden',
                                            border: `2px solid ${currentImageIndex === index ? '#3182CE' : 'transparent'}`,
                                            transition: 'border-color 0.15s ease-in-out',
                                            cursor: 'pointer',
                                            padding: 0,
                                            background: 'none',
                                        }}
                                    >
                                        <img
                                            src={image}
                                            alt={`${item.title} ${index + 1}`}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Item Details */}
                    <div style={itemDetailsContentStyle}>
                        <div>
                            <h1 style={itemTitleStyle}>{item.title}</h1>
                            <p style={itemDescriptionStyle}>{item.category} • Size {item.size}</p>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <span style={{ ...badgeStyle, backgroundColor: '#E2E8F0', color: '#4A5568' }}>{item.condition}</span>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3182CE' }}>{item.points} points</div>
                        </div>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                            {item.tags && item.tags.map(tag => (
                                <span key={tag} style={{ ...badgeStyle, backgroundColor: '#E2E8F0', color: '#4A5568' }}>
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>Description</h3>
                            <p style={{ color: '#4A5568', lineHeight: '1.6' }}>{item.description}</p>
                        </div>

                        {item.measurements && (
                            <div style={{ marginBottom: '1.5rem' }}>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>Measurements</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '1rem', fontSize: '0.875rem' }}>
                                    {Object.entries(item.measurements).map(([key, value]) => (
                                        <div key={key}>
                                            <p style={{ color: '#718096' }}>{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                                            <p style={{ fontWeight: '500' }}>{value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* User Info */}
                        <div style={dashboardCardStyle}>
                            <div style={{ padding: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div style={userAvatarStyleSmall}>
                                            {item.uploaderEmail ? item.uploaderEmail.charAt(0).toUpperCase() : 'U'}
                                        </div>
                                        <div>
                                            <p style={{ fontWeight: '500' }}>{item.uploaderEmail || 'N/A'}</p>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', color: '#718096' }}>
                                                <Star style={{ width: '1rem', height: '1rem', fill: '#F6E05E', color: '#F6E05E' }} />
                                                <span>N/A</span> {/* Rating not implemented */}
                                                <span>• N/A swaps</span> {/* Total swaps not implemented */}
                                            </div>
                                        </div>
                                    </div>
                                    <button style={{ ...outlineButtonStyle, padding: '0.375rem 0.75rem' }} onClick={handleMessage}>
                                        <MessageCircle style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
                                        Message
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.5rem' }}>
                            <button
                                onClick={() => handleSwapOrRedeem('redeem')}
                                style={{ ...primaryButtonStyle, backgroundColor: '#10B981', height: '3rem' }}
                                disabled={loading || item.status !== 'approved' || (item.uploader && typeof item.uploader === 'object' ? item.uploader.id : item.uploader) === user?.id}
                            >
                                <RefreshCw style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                                Redeem for {item.points} Points
                            </button>
                            {item.status === 'redeemed' && (
                                <div style={{ color: '#10B981', marginTop: '1rem' }}>This item has already been redeemed.</div>
                            )}
                            {item.status !== 'approved' && item.status !== 'redeemed' && (
                                <div style={{ color: '#EF4444', marginTop: '1rem' }}>This item is not available for swap/redemption.</div>
                            )}
                            {message && (
                                <div style={{ color: message.includes('success') ? '#10B981' : '#EF4444', marginTop: '1rem' }}>{message}</div>
                            )}
                            <button
                                onClick={() => handleSwapOrRedeem('swap')}
                                style={{ ...outlineButtonStyle, height: '3rem' }}
                                disabled={loading || item.status !== 'available' || (item.uploader && typeof item.uploader === 'object' ? item.uploader.id : item.uploader) === user?.id}
                            >
                                <RefreshCw style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} />
                                Request Swap
                            </button>
                        </div>
                        {(item.status !== 'available' || (item.uploader && typeof item.uploader === 'object' ? item.uploader.id : item.uploader) === user?.id) && (
                            <p style={itemUnavailableMessageStyle}>
                                { (item.uploader && typeof item.uploader === 'object' ? item.uploader.id : item.uploader) === user?.id ? "You cannot swap or redeem your own item." : "This item is not available for swap/redemption."}
                            </p>
                        )}

                        {/* Trust & Safety */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.875rem', color: '#718096', paddingTop: '1rem', borderTop: '1px solid #E2E8F0', marginTop: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <Shield style={{ width: '1rem', height: '1rem' }} />
                                <span>Verified Item</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <Truck style={{ width: '1rem', height: '1rem' }} />
                                <span>Safe Shipping</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Items / More from Uploader (Placeholder) */}
                <section style={{ marginTop: '3rem' }}>
                    <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#2D3748', marginBottom: '1.5rem', textAlign: 'center' }}>More from {item.uploaderEmail || 'This Uploader'}</h2>
                    <div style={dashboardGridStyle}>
                        {Array(3).fill(0).map((_, i) => (
                            <div key={i} style={dashboardItemCardStyle}>
                                <img src={`https://placehold.co/400x300/FEE2E2/EF4444?text=Related+Item+${i+1}`} alt={`Related Item ${i+1}`} style={dashboardItemImageStyle} />
                                <div style={dashboardItemContentStyle}>
                                    <h3 style={dashboardItemTitleStyle}>Another Great Find</h3>
                                    <p style={dashboardItemDescriptionStyle}>Condition: Good</p>
                                    <div style={dashboardItemFooterStyle}>
                                        <span style={dashboardItemPointsStyle}>40 Points</span>
                                        <button onClick={() => onNavigate('item-detail', { itemId: item._id })} style={cardButtonStyle}>View</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
            <MessageBox message={message} onClose={() => setMessage('')} />
            {showReviewModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: '#fff', borderRadius: '1rem', padding: '2rem', maxWidth: '400px', width: '100%', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}>
                        <h2 style={{ color: '#7C3AED', fontWeight: 700, fontSize: '1.5rem', marginBottom: '1rem' }}>Rate the Uploader</h2>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                            {[1,2,3,4,5].map(star => (
                                <Star key={star} style={{ width: '2rem', height: '2rem', color: star <= reviewRating ? '#F6E05E' : '#E5E7EB', cursor: 'pointer' }} onClick={() => setReviewRating(star)} />
                            ))}
                        </div>
                        <textarea
                            placeholder="Leave a comment (optional)"
                            value={reviewComment}
                            onChange={e => setReviewComment(e.target.value)}
                            style={{ width: '100%', minHeight: '60px', borderRadius: '0.5rem', border: '1px solid #E5E7EB', padding: '0.75rem', marginBottom: '1rem' }}
                        />
                        <button
                            style={{ ...primaryButtonStyle, width: '100%' }}
                            onClick={async () => {
                                // Submit review to backend
                                await fetch(`${API_BASE_URL}/ratings`, {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
                                    body: JSON.stringify({
                                        ratedUserId: item.uploader && typeof item.uploader === 'object' ? item.uploader.id : item.uploader,
                                        itemId: item._id,
                                        rating: reviewRating,
                                        comment: reviewComment,
                                        type: 'given'
                                    })
                                });
                                setShowReviewModal(false);
                                setReviewComment("");
                                setReviewRating(4);
                            }}
                        >
                            Submit Review
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const EditProfilePage = ({ onNavigate }) => {
    const { user, token, logout } = useAuth();
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: "",
        bio: "",
        location: "",
        avatar: "",
        joinedDate: "",
        preferences: {
            notifications: true,
            publicProfile: true,
            showLocation: true
        }
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    // Add responsive handling
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const fetchUserProfile = async () => {
            console.log("[EditProfilePage] useEffect triggered. User:", user ? user.id : "not logged in", "Token:", token ? "present" : "absent");
            if (!user || !token || !user.id) {
                setLoading(false);
                console.log("[EditProfilePage] User not logged in or missing ID, stopping profile fetch.");
                return;
            }
            setLoading(true);
            try {
                const response = await fetch(`${API_BASE_URL}/users/${user.id}`, {
                    headers: { 'x-auth-token': token },
                });
                const data = await response.json();
                console.log("[EditProfilePage] API response for user profile:", data);
                if (response.ok) {
                    setProfile({
                        name: data.name || user.email, // Use email as fallback for name
                        email: data.email || user.email,
                        phone: data.phone || '',
                        bio: data.bio || '',
                        location: data.location || '',
                        avatar: data.avatar || `https://placehold.co/150x150/BFDBFE/2B6CB0?text=${(data.email || user.email).charAt(0).toUpperCase()}`,
                        joinedDate: data.createdAt ? new Date(data.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'N/A',
                        preferences: {
                            notifications: data.preferences?.notifications !== undefined ? data.preferences.notifications : true,
                            publicProfile: data.preferences?.publicProfile !== undefined ? data.preferences.publicProfile : true,
                            showLocation: data.preferences?.showLocation !== undefined ? data.preferences.showLocation : true,
                        }
                    });
                    console.log("[EditProfilePage] Profile state updated:", profile);
                } else {
                    setMessage(`Failed to load profile: ${data.msg}`);
                    console.error("[EditProfilePage] Failed to load profile:", data.msg);
                }
            } catch (error) {
                console.error("[EditProfilePage] Error fetching user profile:", error);
                setMessage("Network error fetching profile.");
            } finally {
                setLoading(false);
                console.log("[EditProfilePage] Profile loading set to false.");
            }
        };

        fetchUserProfile();
    }, [user, token]);

    const handleInputChange = (field, value) => {
        setProfile(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handlePreferenceChange = (field, value) => {
        setProfile(prev => ({
            ...prev,
            preferences: {
                ...prev.preferences,
                [field]: value
            }
        }));
    };

    const handleSave = async () => {
        if (!user || !token || !user.id) {
            setMessage("You must be logged in to update your profile.");
            return;
        }
        setIsSaving(true);
        try {
            const response = await fetch(`${API_BASE_URL}/users/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
                body: JSON.stringify({
                    name: profile.name,
                    email: profile.email,
                    phone: profile.phone,
                    bio: profile.bio,
                    location: profile.location,
                    avatar: profile.avatar, // Assuming avatar URL is directly updatable
                    preferences: profile.preferences,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage("Profile updated successfully!");
                // Optionally, refetch user data in AuthContext to update global state
                // This would require a function passed down from AuthProvider
                // For now, we just navigate back to dashboard
                onNavigate('dashboard');
            } else {
                setMessage(`Failed to update profile: ${data.msg}`);
            }
        } catch (error) {
            console.error("Error saving profile:", error);
            setMessage("Network error saving profile.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleAvatarChange = () => {
        setMessage("Photo upload functionality would be implemented here.");
    };

    const handleLogoutClick = () => {
        logout(); // Call the logout function from AuthContext
        onNavigate('landing'); // Navigate to landing page after logout
    };

    if (loading) {
        return (
            <div style={pageContainerStyle}>
                <div style={spinnerStyle}></div>
                <p style={{ fontSize: '1.25rem', color: '#4A5568', marginLeft: '1rem' }}>Loading profile...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div style={pageContainerStyle}>
                <p style={{ fontSize: '1.25rem', color: '#4A5568' }}>Please log in to edit your profile.</p>
            </div>
        );
    }

    console.log("[EditProfilePage] Rendering with profile:", profile); // Log profile before rendering

    return (
        <div style={appContainerStyle}>
            <Header onNavigate={onNavigate} user={user} onLogout={handleLogoutClick} />

            <main style={mainContentStyle}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <button onClick={() => onNavigate('dashboard')} style={{ ...ghostButtonStyle, display: 'inline-flex', alignItems: 'center', color: '#718096' }}>
                        <ArrowLeft style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
                        Back to Dashboard
                    </button>
                    <div>
                        <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#2D3748' }}>Edit Profile</h1>
                        <p style={{ color: '#718096' }}>Update your personal information and preferences</p>
                    </div>
                </div>

                <div style={isMobile ? editProfileGridStyleMobile : editProfileGridStyle}>
                    {/* Profile Picture & Basic Info */}
                    <div style={{ display: 'flex', flexDirection: 'column', minWidth: isMobile ? '100%' : '300px', maxWidth: isMobile ? '100%' : '350px' }}>
                        <div style={dashboardCardStyle}>
                            <div style={cardHeaderStyle}>
                                <h3 style={cardTitleStyle}>Profile Picture</h3>
                            </div>
                            <div style={{ ...cardContentStyle, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                                <div style={{ position: 'relative' }}>
                                    <img
                                        src={profile.avatar}
                                        alt="User Avatar"
                                        style={userAvatarStyleBig}
                                        onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/150x150/BFDBFE/2B6CB0?text=${profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}`; }}
                                    />
                                    <button
                                        style={{ ...actionButtonCircleStyle, position: 'absolute', bottom: '-0.5rem', right: '-0.5rem' }}
                                        onClick={handleAvatarChange}
                                    >
                                        <Camera style={{ width: '1rem', height: '1rem' }} />
                                    </button>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <p style={{ fontWeight: '500', fontSize: '1.125rem' }}>{profile.name}</p>
                                    <p style={{ fontSize: '0.875rem', color: '#718096' }}>Member since {profile.joinedDate}</p>
                                </div>

                                <div style={separatorStyle}></div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#4A5568' }}>
                                        <Mail style={{ width: '1rem', height: '1rem', color: '#718096' }} />
                                        <span>{profile.email}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#4A5568' }}>
                                        <MapPin style={{ width: '1rem', height: '1rem', color: '#718096' }} />
                                        <span>{profile.location}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#4A5568' }}>
                                        <Calendar style={{ width: '1rem', height: '1rem', color: '#718096' }} />
                                        <span>Joined {profile.joinedDate}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Edit Form */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1 }}>
                        {/* Personal Information */}
                        <div style={dashboardCardStyle}>
                            <div style={cardHeaderStyle}>
                                <h3 style={{ ...cardTitleStyle, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <User style={{ width: '1.25rem', height: '1.25rem' }} />
                                    Personal Information
                                </h3>
                            </div>
                            <div style={{ ...cardContentStyle, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={isMobile ? formGridStyleMobile : formGridStyleDesktop}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                        <label htmlFor="name" style={labelStyle}>Full Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            style={inputStyle}
                                            value={profile.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                        <label htmlFor="email" style={labelStyle}>Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            style={inputStyle}
                                            value={profile.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            placeholder="Enter your email"
                                            disabled // Email is typically not editable
                                        />
                                    </div>
                                </div>

                                <div style={isMobile ? formGridStyleMobile : formGridStyleDesktop}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                        <label htmlFor="phone" style={labelStyle}>Phone Number</label>
                                        <input
                                            type="text"
                                            id="phone"
                                            style={inputStyle}
                                            value={profile.phone}
                                            onChange={(e) => handleInputChange('phone', e.target.value)}
                                            placeholder="Enter your phone number"
                                        />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                        <label htmlFor="location" style={labelStyle}>Location</label>
                                        <input
                                            type="text"
                                            id="location"
                                            style={inputStyle}
                                            value={profile.location}
                                            onChange={(e) => handleInputChange('location', e.target.value)}
                                            placeholder="Enter your city, state"
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                    <label htmlFor="bio" style={labelStyle}>Bio</label>
                                    <textarea
                                        id="bio"
                                        rows={isMobile ? "3" : "4"}
                                        style={{ 
                                            ...inputStyle, 
                                            minHeight: isMobile ? '4.5rem' : '6.25rem',
                                            resize: 'vertical'
                                        }}
                                        value={profile.bio}
                                        onChange={(e) => handleInputChange('bio', e.target.value)}
                                        placeholder="Tell us about yourself and your interest in sustainable fashion..."
                                        maxLength={300}
                                    ></textarea>
                                    <p style={{ fontSize: '0.75rem', color: '#718096', marginTop: '0.25rem' }}>
                                        {profile.bio.length}/300 characters
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Privacy Settings */}
                        <div style={dashboardCardStyle}>
                            <div style={cardHeaderStyle}>
                                <h3 style={cardTitleStyle}>Privacy & Preferences</h3>
                            </div>
                            <div style={{ ...cardContentStyle, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'space-between',
                                    flexDirection: isMobile ? 'column' : 'row',
                                    gap: isMobile ? '0.75rem' : '0',
                                    alignItems: isMobile ? 'stretch' : 'center'
                                }}>
                                    <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
                                        <h4 style={{ fontWeight: '500' }}>Email Notifications</h4>
                                        <p style={{ fontSize: '0.875rem', color: '#718096' }}>
                                            Receive updates about swaps and new items
                                        </p>
                                    </div>
                                    <button
                                        style={{ 
                                            ...toggleButtonStyle, 
                                            backgroundColor: profile.preferences.notifications ? '#3182CE' : '#E2E8F0', 
                                            color: profile.preferences.notifications ? '#FFFFFF' : '#4A5568',
                                            width: isMobile ? '100%' : 'auto'
                                        }}
                                        onClick={() => handlePreferenceChange('notifications', !profile.preferences.notifications)}
                                    >
                                        {profile.preferences.notifications ? "Enabled" : "Disabled"}
                                    </button>
                                </div>

                                <div style={separatorStyle}></div>

                                <div style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'space-between',
                                    flexDirection: isMobile ? 'column' : 'row',
                                    gap: isMobile ? '0.75rem' : '0',
                                    alignItems: isMobile ? 'stretch' : 'center'
                                }}>
                                    <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
                                        <h4 style={{ fontWeight: '500' }}>Public Profile</h4>
                                        <p style={{ fontSize: '0.875rem', color: '#718096' }}>
                                            Make your profile visible to other users
                                        </p>
                                    </div>
                                    <button
                                        style={{ 
                                            ...toggleButtonStyle, 
                                            backgroundColor: profile.preferences.publicProfile ? '#3182CE' : '#E2E8F0', 
                                            color: profile.preferences.publicProfile ? '#FFFFFF' : '#4A5568',
                                            width: isMobile ? '100%' : 'auto'
                                        }}
                                        onClick={() => handlePreferenceChange('publicProfile', !profile.preferences.publicProfile)}
                                    >
                                        {profile.preferences.publicProfile ? "Public" : "Private"}
                                    </button>
                                </div>

                                <div style={separatorStyle}></div>

                                <div style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'space-between',
                                    flexDirection: isMobile ? 'column' : 'row',
                                    gap: isMobile ? '0.75rem' : '0',
                                    alignItems: isMobile ? 'stretch' : 'center'
                                }}>
                                    <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
                                        <h4 style={{ fontWeight: '500' }}>Show Location</h4>
                                        <p style={{ fontSize: '0.875rem', color: '#718096' }}>
                                            Display your city to help with local swaps
                                        </p>
                                    </div>
                                    <button
                                        style={{ 
                                            ...toggleButtonStyle, 
                                            backgroundColor: profile.preferences.showLocation ? '#3182CE' : '#E2E8F0', 
                                            color: profile.preferences.showLocation ? '#FFFFFF' : '#4A5568',
                                            width: isMobile ? '100%' : 'auto'
                                        }}
                                        onClick={() => handlePreferenceChange('showLocation', !profile.preferences.showLocation)}
                                    >
                                        {profile.preferences.showLocation ? "Visible" : "Hidden"}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div style={{ 
                            display: 'flex', 
                            gap: '1rem', 
                            justifyContent: isMobile ? 'stretch' : 'flex-end',
                            flexDirection: isMobile ? 'column' : 'row'
                        }}>
                            <button 
                                onClick={() => onNavigate('dashboard')} 
                                style={{ 
                                    ...outlineButtonStyle, 
                                    width: isMobile ? '100%' : 'auto',
                                    order: isMobile ? 2 : 1
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                style={{ 
                                    ...primaryButtonStyle, 
                                    width: isMobile ? '100%' : 'auto', 
                                    display: 'inline-flex', 
                                    alignItems: 'center', 
                                    padding: '0.75rem 1.5rem',
                                    order: isMobile ? 1 : 2
                                }}
                            >
                                <Save style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
                                {isSaving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
            <MessageBox message={message} onClose={() => setMessage('')} />
        </div>
    );
};

// New PointsHistory Component
const PointsHistory = () => {
    const { user, token } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [type, setType] = useState("all");
    const [category, setCategory] = useState("all");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [balance, setBalance] = useState(0);
    const [totalEarned, setTotalEarned] = useState(0);
    const [totalSpent, setTotalSpent] = useState(0);
    const [thisMonthEarned, setThisMonthEarned] = useState(0);
    const [thisMonthSpent, setThisMonthSpent] = useState(0);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!user || !token) return;
        const fetchData = async () => {
            setLoading(true);
            try {
                const params = [];
                if (type !== "all") params.push(`type=${type}`);
                if (category !== "all") params.push(`category=${category}`);
                if (dateFrom) params.push(`dateFrom=${dateFrom}`);
                if (dateTo) params.push(`dateTo=${dateTo}`);
                if (search) params.push(`search=${encodeURIComponent(search)}`);
                const url = `${API_BASE_URL}/users/${user.id}/points-history${params.length ? "?" + params.join("&") : ""}`;
                const response = await fetch(url, {
                    headers: { 'x-auth-token': token }
                });
                const data = await response.json();
                if (response.ok) {
                    setTransactions(data);
                    // Calculate stats
                    let bal = 0, earned = 0, spent = 0, monthEarned = 0, monthSpent = 0;
                    const now = new Date();
                    data.slice().reverse().forEach(tx => {
                        bal = tx.balanceAfter;
                    });
                    data.forEach(tx => {
                        if (tx.amount > 0) earned += tx.amount;
                        if (tx.amount < 0) spent += Math.abs(tx.amount);
                        const txDate = new Date(tx.createdAt);
                        if (txDate.getMonth() === now.getMonth() && txDate.getFullYear() === now.getFullYear()) {
                            if (tx.amount > 0) monthEarned += tx.amount;
                            if (tx.amount < 0) monthSpent += Math.abs(tx.amount);
                        }
                    });
                    setBalance(bal);
                    setTotalEarned(earned);
                    setTotalSpent(spent);
                    setThisMonthEarned(monthEarned);
                    setThisMonthSpent(monthSpent);
                } else {
                    setMessage(data.msg || "Failed to load points history");
                }
            } catch (err) {
                setMessage("Network error fetching points history");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [user, token, type, category, dateFrom, dateTo, search]);

    // ... UI code for filter bar, stats, and transaction table ...
    // Use the same layout as your screenshot, but all values are dynamic
    // ... existing code ...
};

// New RatingsPage Component
const RatingsPage = () => {
    const [selectedRating, setSelectedRating] = useState(0);
    const [comment, setComment] = useState('');
    const [activeTab, setActiveTab] = useState('pending');
    const [message, setMessage] = useState(''); // For MessageBox

    // Mock data - in real app, this would come from your backend/Supabase
    const [pendingRatings] = useState([
        {
            id: '1',
            swapId: 'swap_001',
            partnerName: 'Sarah Johnson',
            partnerAvatar: 'https://placehold.co/150x150/A78BFA/FFFFFF?text=SJ',
            itemSwapped: 'Vintage Denim Jacket',
            completedDate: '2024-01-10'
        },
        {
            id: '2',
            swapId: 'swap_002',
            partnerName: 'Mike Chen',
            partnerAvatar: 'https://placehold.co/150x150/A78BFA/FFFFFF?text=MC',
            itemSwapped: 'Designer Sneakers',
            completedDate: '2024-01-08'
        }
    ]);

    const [ratingsHistory] = useState([
        {
            id: '1',
            userId: 'user_001',
            userName: 'Emma Davis',
            userAvatar: 'https://placehold.co/150x150/A78BFA/FFFFFF?text=ED',
            rating: 5,
            comment: 'Amazing swap! Item was exactly as described and shipped quickly.',
            swapId: 'swap_003',
            itemName: 'Cashmere Sweater',
            date: '2024-01-05',
            type: 'received'
        },
        {
            id: '2',
            userId: 'user_002',
            userName: 'Alex Wilson',
            userAvatar: 'https://placehold.co/150x150/A78BFA/FFFFFF?text=AW',
            rating: 4,
            comment: 'Great communication and item condition. Would swap again!',
            swapId: 'swap_004',
            itemName: 'Leather Boots',
            date: '2024-01-03',
            type: 'given'
        }
    ]);

    const handleSubmitRating = (pendingId) => {
        if (selectedRating === 0) {
            setMessage("Please select a star rating before submitting.");
            return;
        }

        // Here you would make API call to submit rating
        setMessage("Rating Submitted! Thank you for your feedback! This helps build trust in our community.");

        setSelectedRating(0);
        setComment('');
        // In a real app, you'd remove the submitted rating from pendingRatings state
    };

    const renderStars = (rating, interactive = false, size = 'md') => {
        const sizeStyle = {
            sm: { height: '1rem', width: '1rem' },
            md: { height: '1.25rem', width: '1.25rem' },
            lg: { height: '1.5rem', width: '1.5rem' }
        };

        return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        style={{
                            ...sizeStyle[size],
                            fill: star <= rating ? '#F6E05E' : 'none',
                            color: star <= rating ? '#F6E05E' : '#A0AEC0',
                            cursor: interactive ? 'pointer' : 'default',
                            transition: 'color 0.15s ease-in-out, fill 0.15s ease-in-out',
                        }}
                        onClick={interactive ? () => setSelectedRating(star) : undefined}
                    />
                ))}
            </div>
        );
    };

    return (
        <div style={{ padding: '1.5rem', backgroundColor: '#F7FAFC', borderRadius: '0.75rem' }}>
            <div style={{ maxWidth: '64rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#2D3748' }}>
                        Ratings & Reviews
                    </h1>
                    <p style={{ color: '#718096' }}>
                        Rate your swap experiences and view your feedback history
                    </p>
                </div>

                {/* Tab Navigation */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '0.5rem', padding: '0.25rem', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)' }}>
                        <div style={{ display: 'flex' }}>
                            <button
                                style={{ ...navButtonStyle, ... (activeTab === 'pending' ? primaryNavButtonStyle : {}), display: 'flex', alignItems: 'center' }}
                                onClick={() => setActiveTab('pending')}
                            >
                                <Clock style={{ height: '1rem', width: '1rem', marginRight: '0.5rem' }} />
                                Pending Ratings
                                {pendingRatings.length > 0 && (
                                    <span style={{ marginLeft: '0.5rem', height: '1.25rem', width: '1.25rem', borderRadius: '9999px', padding: '0.125rem', fontSize: '0.75rem', backgroundColor: '#3182CE', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {pendingRatings.length}
                                    </span>
                                )}
                            </button>
                            <button
                                style={{ ...navButtonStyle, ... (activeTab === 'history' ? primaryNavButtonStyle : {}), display: 'flex', alignItems: 'center' }}
                                onClick={() => setActiveTab('history')}
                            >
                                <UserCheck style={{ height: '1rem', width: '1rem', marginRight: '0.5rem' }} />
                                Rating History
                            </button>
                        </div>
                    </div>
                </div>

                {/* Pending Ratings */}
                {activeTab === 'pending' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {pendingRatings.length === 0 ? (
                            <div style={emptyStateCardStyle}>
                                <CheckCircle style={{ height: '3rem', width: '3rem', color: '#48BB78', margin: '0 auto 1rem' }} />
                                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>All caught up!</h3>
                                <p style={{ color: '#718096' }}>No pending ratings at the moment.</p>
                            </div>
                        ) : (
                            pendingRatings.map((pending) => (
                                <div key={pending.id} style={dashboardCardStyle}>
                                    <div style={{ padding: '1.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                            <img src={pending.partnerAvatar} alt={pending.partnerName} style={{ height: '3rem', width: '3rem', borderRadius: '9999px', objectFit: 'cover' }} />
                                            <div style={{ flex: 1 }}>
                                                <h4 style={{ fontSize: '1.125rem', fontWeight: '600' }}>{pending.partnerName}</h4>
                                                <p style={{ fontSize: '0.875rem', color: '#718096' }}>
                                                    Swapped: {pending.itemSwapped} • Completed: {new Date(pending.completedDate).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div style={{ marginBottom: '1rem' }}>
                                            <label style={labelStyle}>Rate your experience</label>
                                            {renderStars(selectedRating, true, 'lg')}
                                        </div>
                                        
                                        <div style={{ marginBottom: '1rem' }}>
                                            <label style={labelStyle}>Comments (optional)</label>
                                            <textarea
                                                placeholder="Share your experience with this swap partner..."
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                style={{ ...inputStyle, minHeight: '5rem' }}
                                            ></textarea>
                                        </div>
                                        
                                        <button 
                                            onClick={() => handleSubmitRating(pending.id)}
                                            style={{ ...primaryButtonStyle, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        >
                                            <Send style={{ height: '1rem', width: '1rem', marginRight: '0.5rem' }} />
                                            Submit Rating
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* Rating History */}
                {activeTab === 'history' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {ratingsHistory.length === 0 ? (
                            <div style={emptyStateCardStyle}>
                                <Star style={{ height: '3rem', width: '3rem', color: '#A0AEC0', margin: '0 auto 1rem' }} />
                                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>No ratings yet</h3>
                                <p style={{ color: '#718096' }}>Complete some swaps to see your rating history here.</p>
                            </div>
                        ) : (
                            ratingsHistory.map((rating) => (
                                <div key={rating.id} style={dashboardCardStyle}>
                                    <div style={{ padding: '1.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                            <img src={rating.userAvatar} alt={rating.userName} style={{ height: '2.5rem', width: '2.5rem', borderRadius: '9999px', objectFit: 'cover' }} />
                                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <div>
                                                        <h4 style={{ fontWeight: '600' }}>{rating.userName}</h4>
                                                        <p style={{ fontSize: '0.75rem', color: '#718096' }}>
                                                            {rating.itemName} • {new Date(rating.date).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                        <span style={{ ...badgeStyle, backgroundColor: rating.type === 'received' ? '#3182CE' : '#A0AEC0', color: '#FFFFFF', padding: '0.2rem 0.5rem', borderRadius: '0.25rem' }}>
                                                            {rating.type === 'received' ? 'Received' : 'Given'}
                                                        </span>
                                                        {renderStars(rating.rating, false, 'sm')}
                                                    </div>
                                                </div>
                                                {rating.comment && (
                                                    <p style={{ fontSize: '0.875rem', color: '#4A5568', backgroundColor: '#F0F4F8', padding: '0.75rem', borderRadius: '0.375rem' }}>
                                                        "{rating.comment}"
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
            <MessageBox message={message} onClose={() => setMessage('')} />
        </div>
    );
};

const AdminPanel = ({ onNavigate }) => {
    const { token, user } = useAuth();
    const [tab, setTab] = useState('pending'); // 'pending' or 'all'
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [search, setSearch] = useState('');
    const [modalItem, setModalItem] = useState(null);
    const [actionLoading, setActionLoading] = useState(null); // Track which action is loading
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('desc');
    const [selectedItems, setSelectedItems] = useState([]);
    const [bulkAction, setBulkAction] = useState('');

    const fetchItems = async () => {
        setLoading(true);
        setMessage('');
        let url = tab === 'pending'
            ? 'http://localhost:5000/api/admin/items/pending'
            : 'http://localhost:5000/api/admin/items/all';
        try {
            const response = await fetch(url, {
                headers: { 'x-auth-token': token }
            });
            const data = await response.json();
            if (response.ok) {
                setItems(data);
            } else {
                setMessage(data.msg || 'Failed to fetch items');
            }
        } catch (error) {
            setMessage('Network error fetching items');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
        // eslint-disable-next-line
    }, [tab]);

    // Auto-logout if token is invalid
    useEffect(() => {
        if (message && message.toLowerCase().includes('token is not valid')) {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
                window.location.reload();
            }
        }
    }, [message]);

    const handleAction = async (itemId, action) => {
        setActionLoading(itemId + action);
        setMessage('');
        let url = '';
        let method = 'PUT';
        if (action === 'approve') {
            url = `http://localhost:5000/api/admin/items/${itemId}/approve`;
        } else if (action === 'reject') {
            url = `http://localhost:5000/api/admin/items/${itemId}/reject`;
        } else if (action === 'delete') {
            url = `http://localhost:5000/api/admin/items/${itemId}`;
            method = 'DELETE';
        }
        try {
            const response = await fetch(url, {
                method,
                headers: { 'x-auth-token': token }
            });
            const data = await response.json();
            if (response.ok) {
                setMessage(`Item ${action}d successfully!`);
                fetchItems();
                setSelectedItems(prev => prev.filter(id => id !== itemId));
            } else {
                setMessage(data.msg || `Failed to ${action} item`);
            }
        } catch (error) {
            setMessage(`Network error during ${action}`);
        } finally {
            setActionLoading(null);
        }
    };

    const handleBulkAction = async () => {
        if (!bulkAction || selectedItems.length === 0) return;
        
        setActionLoading('bulk');
        setMessage('');
        
        try {
            const promises = selectedItems.map(itemId => {
                let url = '';
                let method = 'PUT';
                if (bulkAction === 'approve') {
                    url = `http://localhost:5000/api/admin/items/${itemId}/approve`;
                } else if (bulkAction === 'reject') {
                    url = `http://localhost:5000/api/admin/items/${itemId}/reject`;
                } else if (bulkAction === 'delete') {
                    url = `http://localhost:5000/api/admin/items/${itemId}`;
                    method = 'DELETE';
                }
                
                return fetch(url, {
                    method,
                    headers: { 'x-auth-token': token }
                });
            });
            
            const responses = await Promise.all(promises);
            const failedCount = responses.filter(r => !r.ok).length;
            const successCount = responses.length - failedCount;
            
            if (successCount > 0) {
                setMessage(`Successfully ${bulkAction}d ${successCount} items${failedCount > 0 ? `, ${failedCount} failed` : ''}`);
                fetchItems();
                setSelectedItems([]);
                setBulkAction('');
            } else {
                setMessage(`Failed to ${bulkAction} items`);
            }
        } catch (error) {
            setMessage(`Network error during bulk ${bulkAction}`);
        } finally {
            setActionLoading(null);
        }
    };

    const toggleSelectAll = () => {
        if (selectedItems.length === filteredItems.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(filteredItems.map(item => item._id));
        }
    };

    const toggleSelectItem = (itemId) => {
        setSelectedItems(prev => 
            prev.includes(itemId) 
                ? prev.filter(id => id !== itemId)
                : [...prev, itemId]
        );
    };

    // Filter and sort items
    const filteredItems = items
        .filter(item => {
            const searchLower = search.toLowerCase();
            const uploaderEmail = item.uploaderEmail || (item.uploader && item.uploader.email) || '';
            const matchesSearch = (
                item.title.toLowerCase().includes(searchLower) ||
                uploaderEmail.toLowerCase().includes(searchLower)
            );
            const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
            const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
            return matchesSearch && matchesCategory && matchesStatus;
        })
        .sort((a, b) => {
            let aValue = a[sortBy];
            let bValue = b[sortBy];
            
            if (sortBy === 'createdAt') {
                aValue = new Date(aValue);
                bValue = new Date(bValue);
            }
            
            if (sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

    // Get unique categories for filter
    const categories = ['all', ...new Set(items.map(item => item.category))];
    const statuses = ['all', 'pending', 'approved', 'rejected'];

    // Get status badge style
    const getStatusBadge = (status) => {
        const baseStyle = {
            padding: '0.25rem 0.5rem',
            borderRadius: '0.25rem',
            fontSize: '0.75rem',
            fontWeight: '500',
            textTransform: 'uppercase'
        };
        
        switch (status) {
            case 'pending':
                return { ...baseStyle, backgroundColor: '#FEF3C7', color: '#92400E' };
            case 'approved':
                return { ...baseStyle, backgroundColor: '#D1FAE5', color: '#065F46' };
            case 'rejected':
                return { ...baseStyle, backgroundColor: '#FEE2E2', color: '#991B1B' };
            default:
                return { ...baseStyle, backgroundColor: '#E5E7EB', color: '#374151' };
        }
    };

    // Modal for item details
    const ItemModal = ({ item, onClose }) => (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
            <div style={{ 
                background: '#fff', 
                borderRadius: '0.5rem', 
                padding: '2rem', 
                maxWidth: '40rem', 
                width: '90%', 
                maxHeight: '90vh',
                overflow: 'auto',
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)' 
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{item.title}</h2>
                    <button 
                        onClick={onClose}
                        style={{ 
                            background: 'none', 
                            border: 'none', 
                            fontSize: '1.5rem', 
                            cursor: 'pointer',
                            color: '#6B7280'
                        }}
                    >
                        ×
                    </button>
                </div>
                
                <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    style={{ 
                        width: '100%', 
                        maxHeight: '300px', 
                        objectFit: 'cover', 
                        borderRadius: '0.5rem', 
                        marginBottom: '1rem' 
                    }} 
                />
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                        <p><b>Description:</b></p>
                        <p style={{ color: '#4B5563', marginTop: '0.25rem' }}>{item.description}</p>
                    </div>
                    <div>
                        <p><b>Category:</b> {item.category}</p>
                        <p><b>Type:</b> {item.type}</p>
                        <p><b>Size:</b> {item.size}</p>
                        <p><b>Condition:</b> {item.condition}</p>
                        <p><b>Points:</b> {item.points}</p>
                        <p><b>Status:</b> <span style={getStatusBadge(item.status)}>{item.status}</span></p>
                        <p><b>Uploader:</b> {item.uploaderEmail || (item.uploader && item.uploader.email)}</p>
                        <p><b>Listed:</b> {new Date(item.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
                
                {item.tags && item.tags.length > 0 && (
                    <div style={{ marginBottom: '1rem' }}>
                        <p><b>Tags:</b></p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.25rem' }}>
                            {item.tags.map((tag, index) => (
                                <span key={index} style={{ 
                                    backgroundColor: '#E5E7EB', 
                                    padding: '0.25rem 0.5rem', 
                                    borderRadius: '0.25rem', 
                                    fontSize: '0.75rem' 
                                }}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
                
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                    <button style={{ ...outlineButtonStyle, width: 'auto' }} onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );

    // Add or update styles for the admin panel filter section
    const adminPanelFilterStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '1.5rem',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F9FAFB',
        padding: '1rem',
        borderRadius: '0.5rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
    };

    return (
        <div style={{ ...pageContainerStyle, padding: '1rem' }}>
            <div style={{ 
                ...formCardStyle, 
                maxWidth: '95vw', 
                width: '100%',
                minWidth: '800px'
            }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div>
                        <h2 style={formTitleStyle}>Admin Panel</h2>
                        <p style={{ color: '#6B7280', marginTop: '0.5rem' }}>
                            Welcome, {user?.email || 'Admin'}! Moderate and manage item listings below.
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                            style={{ ...outlineButtonStyle, width: 'auto' }}
                            onClick={() => onNavigate('dashboard')}
                        >
                            ← Back to Dashboard
                        </button>
                        <button
                            style={{ ...logoutButtonStyle, width: 'auto' }}
                            onClick={() => {
                                // Clear auth state and redirect to login
                                if (typeof window !== 'undefined') {
                                    localStorage.removeItem('token');
                                }
                                if (typeof window !== 'undefined') {
                                    window.location.reload();
                                }
                            }}
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                    <div style={{ backgroundColor: '#FEF3C7', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#92400E' }}>
                            {items.filter(item => item.status === 'pending').length}
                        </div>
                        <div style={{ fontSize: '0.875rem', color: '#92400E' }}>Pending Review</div>
                    </div>
                    <div style={{ backgroundColor: '#D1FAE5', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#065F46' }}>
                            {items.filter(item => item.status === 'approved').length}
                        </div>
                        <div style={{ fontSize: '0.875rem', color: '#065F46' }}>Approved</div>
                    </div>
                    <div style={{ backgroundColor: '#FEE2E2', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#991B1B' }}>
                            {items.filter(item => item.status === 'rejected').length}
                        </div>
                        <div style={{ fontSize: '0.875rem', color: '#991B1B' }}>Rejected</div>
                    </div>
                    <div style={{ backgroundColor: '#E5E7EB', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#374151' }}>
                            {items.length}
                        </div>
                        <div style={{ fontSize: '0.875rem', color: '#374151' }}>Total Items</div>
                    </div>
                </div>

                {/* Controls */}
                <div style={adminPanelFilterStyle}>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                        <button
                            style={{ 
                                ...primaryButtonStyle, 
                                width: 'auto', 
                                backgroundColor: tab === 'pending' ? '#3182CE' : '#F3F4F6', 
                                color: tab === 'pending' ? '#fff' : '#374151',
                                border: tab === 'pending' ? 'none' : '1px solid #D1D5DB'
                            }}
                            onClick={() => setTab('pending')}
                        >
                            Pending Items ({items.filter(item => item.status === 'pending').length})
                        </button>
                        <button
                            style={{ 
                                ...primaryButtonStyle, 
                                width: 'auto', 
                                backgroundColor: tab === 'all' ? '#3182CE' : '#F3F4F6', 
                                color: tab === 'all' ? '#fff' : '#374151',
                                border: tab === 'all' ? 'none' : '1px solid #D1D5DB'
                            }}
                            onClick={() => setTab('all')}
                        >
                            All Items ({items.length})
                        </button>
                    </div>
                    
                    {/* Filters */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', flex: '1' }}>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                style={{ ...inputStyle, width: '180px' }}
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>
                                        {cat === 'all' ? 'All Categories' : cat}
                                    </option>
                                ))}
                            </select>
                            
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                style={{ ...inputStyle, width: '180px' }}
                            >
                                {statuses.map(status => (
                                    <option key={status} value={status}>
                                        {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                                    </option>
                                ))}
                            </select>
                            
                            <select
                                value={`${sortBy}-${sortOrder}`}
                                onChange={(e) => {
                                    const [field, order] = e.target.value.split('-');
                                    setSortBy(field);
                                    setSortOrder(order);
                                }}
                                style={{ ...inputStyle, width: '180px' }}
                            >
                                <option value="createdAt-desc">Newest First</option>
                                <option value="createdAt-asc">Oldest First</option>
                                <option value="title-asc">Title A-Z</option>
                                <option value="title-desc">Title Z-A</option>
                                <option value="points-desc">Points High-Low</option>
                                <option value="points-asc">Points Low-High</option>
                            </select>
                            
                            <input
                                type="text"
                                placeholder="Search by title or uploader..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                style={{ ...inputStyle, width: '250px' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Loading and Messages */}
                {loading && (
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                        <div style={spinnerStyle}></div>
                        <p style={{ marginTop: '1rem', color: '#6B7280' }}>Loading items...</p>
                    </div>
                )}
                
                {message && (
                    <div style={{ 
                        padding: '1rem', 
                        borderRadius: '0.5rem', 
                        marginBottom: '1rem',
                        backgroundColor: message.includes('successfully') ? '#D1FAE5' : '#FEE2E2',
                        color: message.includes('successfully') ? '#065F46' : '#991B1B',
                        border: `1px solid ${message.includes('successfully') ? '#A7F3D0' : '#FCA5A5'}`
                    }}>
                        {message}
                    </div>
                )}

                {/* Empty State */}
                {!loading && filteredItems.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '3rem', color: '#6B7280' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
                        <h3 style={{ marginBottom: '0.5rem' }}>No items found</h3>
                        <p>
                            {tab === 'pending' 
                                ? 'No pending items to review.' 
                                : search || selectedCategory !== 'all' || selectedStatus !== 'all'
                                    ? 'No items match your current filters. Try adjusting your search or filters.'
                                    : 'No items in the system.'
                            }
                        </p>
                        {(search || selectedCategory !== 'all' || selectedStatus !== 'all') && (
                            <button
                                onClick={() => {
                                    setSearch('');
                                    setSelectedCategory('all');
                                    setSelectedStatus('all');
                                }}
                                style={{ ...outlineButtonStyle, width: 'auto', marginTop: '1rem' }}
                            >
                                Clear All Filters
                            </button>
                        )}
                    </div>
                )}

                {/* Bulk Actions */}
                {selectedItems.length > 0 && (
                    <div style={{ 
                        backgroundColor: '#F0F9FF', 
                        padding: '1rem', 
                        borderRadius: '0.5rem', 
                        marginBottom: '1rem',
                        border: '1px solid #BAE6FD'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                            <span style={{ fontWeight: '500', color: '#0369A1' }}>
                                {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
                            </span>
                            <select
                                value={bulkAction}
                                onChange={(e) => setBulkAction(e.target.value)}
                                style={{ ...inputStyle, width: '150px' }}
                            >
                                <option value="">Choose action...</option>
                                <option value="approve">Approve All</option>
                                <option value="reject">Reject All</option>
                                <option value="delete">Delete All</option>
                            </select>
                            <button
                                onClick={handleBulkAction}
                                disabled={!bulkAction || actionLoading === 'bulk'}
                                style={{ 
                                    ...primaryButtonStyle, 
                                    width: 'auto',
                                    opacity: (!bulkAction || actionLoading === 'bulk') ? 0.6 : 1
                                }}
                            >
                                {actionLoading === 'bulk' ? 'Processing...' : 'Apply'}
                            </button>
                            <button
                                onClick={() => {
                                    setSelectedItems([]);
                                    setBulkAction('');
                                }}
                                style={{ ...outlineButtonStyle, width: 'auto' }}
                            >
                                Clear Selection
                            </button>
                        </div>
                    </div>
                )}

                {/* Items Table */}
                {!loading && filteredItems.length > 0 && (
                    <div style={{ overflow: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', tableLayout: 'fixed' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid #E5E7EB', backgroundColor: '#F9FAFB' }}>
                                    <th style={{ textAlign: 'left', padding: '1rem 0.5rem', fontWeight: '600', width: '50px' }}>
                                        <input
                                            type="checkbox"
                                            checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                                            onChange={toggleSelectAll}
                                            style={{ width: '16px', height: '16px' }}
                                        />
                                    </th>
                                    <th style={{ textAlign: 'left', padding: '1rem 0.5rem', fontWeight: '600', width: '25%' }}>Item</th>
                                    <th style={{ textAlign: 'left', padding: '1rem 0.5rem', fontWeight: '600', width: '20%' }}>Uploader</th>
                                    <th style={{ textAlign: 'left', padding: '1rem 0.5rem', fontWeight: '600', width: '12%' }}>Category</th>
                                    <th style={{ textAlign: 'left', padding: '1rem 0.5rem', fontWeight: '600', width: '8%' }}>Points</th>
                                    <th style={{ textAlign: 'left', padding: '1rem 0.5rem', fontWeight: '600', width: '10%' }}>Status</th>
                                    <th style={{ textAlign: 'left', padding: '1rem 0.5rem', fontWeight: '600', width: '12%' }}>Date</th>
                                    <th style={{ textAlign: 'left', padding: '1rem 0.5rem', fontWeight: '600', width: '13%' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.map(item => (
                                    <tr key={item._id} style={{ borderBottom: '1px solid #E5E7EB', '&:hover': { backgroundColor: '#F9FAFB' } }}>
                                        <td style={{ padding: '1rem 0.5rem' }}>
                                            <input
                                                type="checkbox"
                                                checked={selectedItems.includes(item._id)}
                                                onChange={() => toggleSelectItem(item._id)}
                                                style={{ width: '16px', height: '16px' }}
                                            />
                                        </td>
                                        <td style={{ padding: '1rem 0.5rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <img 
                                                    src={item.imageUrl} 
                                                    alt={item.title}
                                                    style={{ 
                                                        width: '40px', 
                                                        height: '40px', 
                                                        objectFit: 'cover', 
                                                        borderRadius: '0.25rem' 
                                                    }}
                                                />
                                                <div>
                                                    <div style={{ fontWeight: '500' }}>{item.title}</div>
                                                    <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>{item.type}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ padding: '1rem 0.5rem' }}>{item.uploaderEmail || (item.uploader && item.uploader.email)}</td>
                                        <td style={{ padding: '1rem 0.5rem' }}>{item.category}</td>
                                        <td style={{ padding: '1rem 0.5rem', fontWeight: '500' }}>{item.points}</td>
                                        <td style={{ padding: '1rem 0.5rem' }}>
                                            <span style={getStatusBadge(item.status)}>{item.status}</span>
                                        </td>
                                        <td style={{ padding: '1rem 0.5rem', fontSize: '0.875rem', color: '#6B7280' }}>
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </td>
                                        <td style={{ padding: '1rem 0.5rem' }}>
                                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                                <button 
                                                    style={{ ...outlineButtonStyle, width: 'auto', padding: '0.25rem 0.75rem', fontSize: '0.875rem' }} 
                                                    onClick={() => setModalItem(item)}
                                                >
                                                    View
                                                </button>
                                                {tab === 'pending' && (
                                                    <>
                                                        <button 
                                                            style={{ 
                                                                ...primaryButtonStyle, 
                                                                width: 'auto', 
                                                                padding: '0.25rem 0.75rem', 
                                                                fontSize: '0.875rem',
                                                                opacity: actionLoading === item._id + 'approve' ? 0.6 : 1
                                                            }} 
                                                            onClick={() => handleAction(item._id, 'approve')}
                                                            disabled={actionLoading === item._id + 'approve'}
                                                        >
                                                            {actionLoading === item._id + 'approve' ? '...' : 'Approve'}
                                                        </button>
                                                        <button 
                                                            style={{ 
                                                                ...secondaryButtonStyle, 
                                                                width: 'auto', 
                                                                padding: '0.25rem 0.75rem', 
                                                                fontSize: '0.875rem',
                                                                opacity: actionLoading === item._id + 'reject' ? 0.6 : 1
                                                            }} 
                                                            onClick={() => handleAction(item._id, 'reject')}
                                                            disabled={actionLoading === item._id + 'reject'}
                                                        >
                                                            {actionLoading === item._id + 'reject' ? '...' : 'Reject'}
                                                        </button>
                                                    </>
                                                )}
                                                <button 
                                                    style={{ 
                                                        ...outlineButtonStyle, 
                                                        width: 'auto', 
                                                        padding: '0.25rem 0.75rem', 
                                                        fontSize: '0.875rem', 
                                                        color: '#E53E3E', 
                                                        borderColor: '#E53E3E',
                                                        opacity: actionLoading === item._id + 'delete' ? 0.6 : 1
                                                    }} 
                                                    onClick={() => handleAction(item._id, 'delete')}
                                                    disabled={actionLoading === item._id + 'delete'}
                                                >
                                                    {actionLoading === item._id + 'delete' ? '...' : 'Delete'}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Modal */}
                {modalItem && <ItemModal item={modalItem} onClose={() => setModalItem(null)} />}
            </div>
        </div>
    );
};

// New component to encapsulate the main app logic
const AppContent = () => {
    const [currentPage, setCurrentPage] = useState('landing');
    const [pageProps, setPageProps] = useState({});
    const { loading: authLoading } = useAuth(); // Only need loading state here

    const handleNavigate = (page, props = {}) => {
        setCurrentPage(page);
        setPageProps(props);
    };

    // If authentication is still loading, show a loading indicator
    if (authLoading) {
        return (
            <div style={pageContainerStyle}>
                <div style={spinnerStyle}></div>
                <p style={{ fontSize: '1.25rem', color: '#4A5568', marginTop: '1rem' }}>Initializing ReWear...</p>
            </div>
        );
    }

    // Render the current page based on state
    let PageComponent;
    switch (currentPage) {
        case 'login':
            PageComponent = <LoginPage onLoginSuccess={() => handleNavigate('dashboard')} onNavigate={handleNavigate} />;
            break;
        case 'register':
            PageComponent = <RegisterPage onRegisterSuccess={() => handleNavigate('login')} onNavigate={handleNavigate} />;
            break;
        case 'dashboard':
            PageComponent = <Dashboard onNavigate={handleNavigate} />; // Use the new Dashboard component
            break;
        case 'browse':
            PageComponent = <BrowseItemsPage onNavigate={handleNavigate} />;
            break;
        case 'add-item':
            PageComponent = <AddNewItemPage onNavigate={handleNavigate} />;
            break;
        case 'item-detail':
            PageComponent = <ItemDetailPage onNavigate={handleNavigate} itemId={pageProps.itemId} />;
            break;
        case 'edit-profile':
            PageComponent = <EditProfilePage onNavigate={handleNavigate} />;
            break;
        case 'points-history': // New route for points history
            PageComponent = <PointsHistory />;
            break;
        case 'ratings': // New route for ratings
            PageComponent = <RatingsPage />;
            break;
        case 'landing':
        default:
            PageComponent = <LandingPage onNavigate={handleNavigate} />;
            break;
        case 'admin-panel':
            PageComponent = <AdminPanel onNavigate={handleNavigate} />;
            break;
    }

    return PageComponent; // Return the selected page component
};


// Main App Component
const App = () => {
    // Add custom scrollbar styles
    React.useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            .horizontal-scroll::-webkit-scrollbar {
                height: 8px;
            }
            .horizontal-scroll::-webkit-scrollbar-track {
                background: #F7FAFC;
                border-radius: 4px;
            }
            .horizontal-scroll::-webkit-scrollbar-thumb {
                background: #CBD5E0;
                border-radius: 4px;
            }
            .horizontal-scroll::-webkit-scrollbar-thumb:hover {
                background: #A0AEC0;
            }
        `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    return (
        <div style={rootContainerStyle}>
            <AuthProvider>
                {/* All components that useAuth must be children of AuthProvider */}
                <AppContent />
            </AuthProvider>
        </div>
    );
};

export default App;
