export default function GetAppSection() {
  return (
    <section className="py-16 sm:py-20 px-4 bg-surface border-t border-gray-100">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8 sm:gap-10">
        <div className="text-center sm:text-left">
          <p className="text-[11px] font-black tracking-[0.22em] text-gray-400 uppercase mb-3">Get the app</p>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-2">Agrolync in your pocket.</h3>
          <p className="text-gray-500 text-sm sm:text-base">
            Works on basic Android phones and 2G networks. Zero data? Use <span className="font-bold text-primary-600">*347#</span>
          </p>
        </div>
        <div className="flex flex-col xs:flex-row gap-3 shrink-0 w-full sm:w-auto">
          <a href="#" className="flex items-center gap-2.5 bg-gray-900 hover:bg-gray-800 text-white px-5 py-3.5 rounded-2xl transition-colors justify-center sm:justify-start">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="text-white/80"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
            <div>
              <div className="text-[9px] text-white/50 leading-none">Download on the</div>
              <div className="text-sm font-bold leading-tight">App Store</div>
            </div>
          </a>
          <a href="#" className="flex items-center gap-2.5 bg-gray-900 hover:bg-gray-800 text-white px-5 py-3.5 rounded-2xl transition-colors justify-center sm:justify-start">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="text-white/80"><path d="M3.18 23.76c.3.17.64.24.99.2l12.47-7.2-2.57-2.57-10.89 9.57zm-1.61-20.3C1.21 3.85 1 4.35 1 4.98v14.08c0 .63.21 1.13.57 1.52L14.43 8.5 1.57 3.46zm19.47 8.31-3.07-1.77-2.9 2.9 2.9 2.9 3.09-1.78c.88-.51.88-1.33-.02-1.85zM4.17.28 16.64 7.48l-2.57 2.57L3.18.48c.3-.18.65-.24.99-.2z"/></svg>
            <div>
              <div className="text-[9px] text-white/50 leading-none">Get it on</div>
              <div className="text-sm font-bold leading-tight">Google Play</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
