'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { X, Wheat, Sparkles, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const POPUP_SEEN_KEY = 'pichello-pasta-popup-seen'
const BANNER_DISMISSED_KEY = 'pichello-pasta-banner-dismissed'

// ============================================
// POPUP MODAL COMPONENT (Prima visita)
// ============================================
function PastaPopup({ onClose }: { onClose: () => void }) {
  const [isClosing, setIsClosing] = useState(false)

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      localStorage.setItem(POPUP_SEEN_KEY, 'true')
      onClose()
    }, 300)
  }

  const handleNavigate = () => {
    localStorage.setItem(POPUP_SEEN_KEY, 'true')
    onClose()
  }

  return (
    <div 
      className={cn(
        'fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300',
        isClosing ? 'opacity-0' : 'opacity-100'
      )}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div 
        className={cn(
          'relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300',
          isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        )}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all hover:scale-110"
          aria-label="Chiudi"
        >
          <X className="h-5 w-5 text-gray-700" />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Left side - Bento Grid (same images as HeroPasta) */}
          <div className="md:w-1/2 p-4 bg-amber-50">
            <div className="grid grid-cols-12 grid-rows-6 gap-2 h-64 md:h-80">
              {/* 1. SPAGHETTI - Grande a sinistra */}
              <div className="col-span-7 row-span-4 relative rounded-xl overflow-hidden group">
                <Image
                  src="/images/pasta/spaghetti_appennino_reggiano_3.webp"
                  alt="Spaghetti artigianali trafilati al bronzo"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute bottom-2 left-2 text-white font-semibold text-xs md:text-sm">Spaghetti</span>
              </div>
              
              {/* 2. MEZZI PACCHERI - In alto a destra */}
              <div className="col-span-5 row-span-2 relative rounded-xl overflow-hidden group">
                <Image
                  src="/images/pasta/mezzi_paccheri_appennino_reggiano_6.webp"
                  alt="Mezzi Paccheri trafilati al bronzo"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute bottom-1.5 left-2 text-white font-semibold text-xs">Paccheri</span>
              </div>
              
              {/* 3. FUSILLI - Sotto Mezzi Paccheri */}
              <div className="col-span-5 row-span-2 relative rounded-xl overflow-hidden group">
                <Image
                  src="/images/pasta/fusilli_appennino_reggiano_4.webp"
                  alt="Fusilli di grano duro artigianali"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute bottom-1.5 left-2 text-white font-semibold text-xs">Fusilli</span>
              </div>
              
              {/* 4. PENNE */}
              <div className="col-span-4 row-span-2 relative rounded-xl overflow-hidden group">
                <Image
                  src="/images/pasta/penne_appennino_reggiano_5.webp"
                  alt="Penne rigate trafilate al bronzo"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute bottom-1.5 left-2 text-white font-semibold text-xs">Penne</span>
              </div>
              
              {/* 5. TUBETTI */}
              <div className="col-span-3 row-span-2 relative rounded-xl overflow-hidden group">
                <Image
                  src="/images/pasta/tubetti_appennino_reggiano_3.webp"
                  alt="Tubetti artigianali per minestre"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute bottom-1.5 left-1.5 text-white font-semibold text-[10px]">Tubetti</span>
              </div>
              
              {/* 6. MACCHERONI */}
              <div className="col-span-5 row-span-2 relative rounded-xl overflow-hidden group">
                <Image
                  src="/images/pasta/maccheroni_appennino_reggiano_2.webp"
                  alt="Maccheroni artigianali dell'Appennino"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute bottom-1.5 left-2 text-white font-semibold text-xs">Maccheroni</span>
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-medium w-fit mb-4">
              <Sparkles className="h-4 w-4" />
              Novità 2026
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Pasta Artigianale
              <span className="block text-amber-600">dell&apos;Appennino Reggiano</span>
            </h2>
            
            <p className="text-gray-600 mb-6 text-sm md:text-base">
              Scopri la nostra nuova linea di pasta artigianale: 
              <strong className="text-gray-800"> trafilata al bronzo</strong>, 
              essiccata lentamente e prodotta con 
              <strong className="text-gray-800"> semola di grano duro 100% italiano</strong>.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                Trafilatura al bronzo
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                Essiccazione lenta
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                100% grano italiano
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                5 formati disponibili
              </div>
            </div>

            {/* CTA Button */}
            <Link
              href="/pasta-artigianale-appennino-reggiano"
              onClick={handleNavigate}
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Scopri la collezione
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// TOP BANNER COMPONENT
// ============================================
function TopBanner({ canBeDismissed, onDismiss }: { canBeDismissed: boolean; onDismiss: () => void }) {
  return (
    <div className="relative overflow-hidden">
      <Link
        href="/pasta-artigianale-appennino-reggiano"
        className="group block relative bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 text-white overflow-hidden"
      >
        {/* Animated shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" />
        
        {/* Subtle grain texture overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative py-2.5 px-4">
          <div className="container mx-auto flex items-center justify-center gap-2 text-sm md:text-base">
            {/* Left decoration */}
            <span className="hidden sm:flex items-center gap-1.5 text-amber-200">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            </span>
            
            {/* Main content */}
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <Wheat className="h-4 w-4 text-amber-200 flex-shrink-0" />
                <span className="font-medium">
                  <span className="text-amber-200">Novità!</span>
                  {' '}
                  <span className="hidden sm:inline">Scopri la nostra </span>
                  <span className="font-semibold underline underline-offset-2 decoration-amber-300/50 group-hover:decoration-white transition-colors">
                    Pasta Artigianale
                  </span>
                  <span className="hidden md:inline"> dell&apos;Appennino Reggiano</span>
                </span>
                <span className="text-amber-200 group-hover:translate-x-1 transition-transform duration-200">
                  →
                </span>
              </div>
            </div>

            {/* Right decoration */}
            <span className="hidden sm:flex items-center gap-1.5 text-amber-200">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </span>
          </div>
        </div>

        {/* Close button - only show if can be dismissed */}
        {canBeDismissed && (
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onDismiss()
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-white/20 transition-colors z-10"
            aria-label="Chiudi annuncio"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </Link>
    </div>
  )
}

// ============================================
// MAIN COMPONENT - Orchestrates popup & banner
// ============================================
export function AnnouncementBanner() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  
  const [showPopup, setShowPopup] = useState(false)
  const [showBanner, setShowBanner] = useState(false)
  const [bannerDismissedOtherPages, setBannerDismissedOtherPages] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Check localStorage on mount
    const popupSeen = localStorage.getItem(POPUP_SEEN_KEY) === 'true'
    const bannerDismissed = localStorage.getItem(BANNER_DISMISSED_KEY) === 'true'
    
    setBannerDismissedOtherPages(bannerDismissed)
    
    if (!popupSeen && isHomePage) {
      // First visit on homepage - show popup after small delay
      const timer = setTimeout(() => setShowPopup(true), 500)
      setIsReady(true)
      return () => clearTimeout(timer)
    } else {
      // Popup already seen or not on homepage
      // Decide if we show banner
      if (isHomePage) {
        // Homepage: always show banner
        setShowBanner(true)
      } else {
        // Other pages: show banner only if not dismissed
        setShowBanner(!bannerDismissed)
      }
      setIsReady(true)
    }
  }, [isHomePage])

  const handlePopupClose = () => {
    setShowPopup(false)
    // After popup closes, show the banner
    setShowBanner(true)
  }

  const handleBannerDismiss = () => {
    if (!isHomePage) {
      // Only save dismissal for non-homepage
      localStorage.setItem(BANNER_DISMISSED_KEY, 'true')
      setBannerDismissedOtherPages(true)
      setShowBanner(false)
    }
    // On homepage, banner cannot be dismissed (no X button shown)
  }

  // Don't render anything until ready (prevents hydration mismatch)
  if (!isReady) return null

  // Don't show banner if popup is showing
  if (showPopup) {
    return <PastaPopup onClose={handlePopupClose} />
  }

  // Show banner
  if (showBanner) {
    return (
      <TopBanner 
        canBeDismissed={!isHomePage} 
        onDismiss={handleBannerDismiss} 
      />
    )
  }

  return null
}

export default AnnouncementBanner
