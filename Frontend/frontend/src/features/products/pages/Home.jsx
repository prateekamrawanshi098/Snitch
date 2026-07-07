import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useProduct } from "../hook/useProduct";

const Icon = ({ name, className = "h-5 w-5" }) => {
  const paths = {
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m14 7 5 5-5 5" />
      </>
    ),
    image: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="m21 15-5-5L5 21" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
};

const formatPrice = (amount = 0, currency = "INR") => {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(Number(amount) || 0);
  } catch {
    return `${currency} ${Number(amount || 0).toLocaleString("en-IN")}`;
  }
};

const Home = () => {
  const navigate = useNavigate();
  const allproducts = useSelector((state) => state.product.allproducts);
  const { getAllProductHandler } = useProduct();

  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    const run = async () => {
      setIsLoading(true);
      try {
        await getAllProductHandler();
      } finally {
        if (alive) setIsLoading(false);
      }
    };
    run();
    return () => {
      alive = false;
    };
  }, []);

  const products = useMemo(
    () => (Array.isArray(allproducts) ? allproducts : []),
    [allproducts],
  );

  const visibleProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => {
      const title = (p?.title || "").toLowerCase();
      const desc = (p?.description || "").toLowerCase();
      return title.includes(q) || desc.includes(q);
    });
  }, [products, query]);

  const headerSubtitle = "Curated pieces. Clean editorial layouts.";

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div className="w-full min-h-[768px] h-[768px] bg-[#f4f1ec] font-['Inter',sans-serif] text-[#1d1d1b] selection:bg-[#c9a96e]/30">
        {/* top bar */}
        <header className="h-[68px] border-b border-[#ded9d1] bg-[#f8f6f2] px-6 flex items-center">
          <div className="flex-1 flex items-center gap-6">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="font-['EB_Garamond',serif] text-[28px] font-semibold tracking-[-0.03em]"
            >
              Snitch<span className="text-[#ad8c50]">.</span>
            </button>

            <div className="hidden md:block">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9b958d]">
                Editorial store
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="hidden lg:flex items-center gap-2 border border-[#ded9d1] bg-white px-3 h-9 min-w-[320px] focus-within:border-[#80796f]">
              <Icon name="search" className="h-3.5 w-3.5 text-[#8c867f]" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products"
                className="w-full border-0 bg-transparent p-0 text-[11px] text-[#2a2927] outline-none placeholder:text-[#aaa49b]"
              />
            </label>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="hidden sm:inline-flex items-center h-9 px-4 bg-[#1d1d1b] text-white text-[9px] font-semibold uppercase tracking-[0.14em] hover:bg-black transition-colors"
            >
              Login
            </button>
          </div>
        </header>

        {/* hero */}
        <section className="h-[210px] flex items-end" aria-label="Home hero">
          <div className="px-6 w-full">
            <div className="max-w-[1120px] mx-auto">
              <div className="flex items-end justify-between gap-8">
                <div className="pb-3">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#ad8c50]">
                    New season
                  </p>
                  <h1 className="font-['EB_Garamond',serif] text-[46px] leading-none tracking-[-0.03em] mt-1">
                    The edit, in motion.
                  </h1>
                  <p className="mt-3 text-[11px] text-[#8a847c] max-w-[520px]">
                    {headerSubtitle}
                  </p>
                </div>

                <div className="hidden lg:block pb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border border-[#d1cbc1] bg-[#fdfcf9] flex items-center justify-center text-[#ad8c50]">
                      <span className="font-['EB_Garamond',serif] text-[22px]">
                        S
                      </span>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9c968e]">
                        Available now
                      </p>
                      <p className="text-[12px] font-semibold text-[#1d1d1b]">
                        {products.length} listings
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 lg:hidden">
                <label className="flex items-center gap-2 border border-[#ded9d1] bg-white px-3 h-9 w-full focus-within:border-[#80796f]">
                  <Icon name="search" className="h-3.5 w-3.5 text-[#8c867f]" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search products"
                    className="w-full border-0 bg-transparent p-0 text-[11px] text-[#2a2927] outline-none placeholder:text-[#aaa49b]"
                  />
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* listing canvas */}
        <main className="h-[calc(768px-68px-210px)] min-h-[calc(768px-68px-210px)] overflow-hidden px-6">
          <div className="max-w-[1120px] mx-auto h-full flex flex-col">
            <div className="flex items-center justify-between gap-6 pt-2 pb-3">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#9c968e]">
                  Catalog
                </p>
                <p className="mt-2 text-[12px] text-[#8a847c]">
                  {visibleProducts.length} results
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate("/seller/dashboard")}
                className="hidden md:inline-flex items-center gap-2 border-b border-[#1d1d1b] pb-1 text-[9px] font-semibold uppercase tracking-[0.12em] hover:opacity-90"
              >
                Seller studio
                <Icon name="arrow" className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-10">
                {isLoading &&
                  [0, 1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="border border-[#e2ded7] bg-[#fdfcf9] p-4 rounded-none"
                      aria-hidden="true"
                    >
                      <div className="h-[170px] bg-[#e8e3dc] animate-pulse" />
                      <div className="mt-4 h-3 bg-[#e8e3dc] w-[70%] animate-pulse" />
                      <div className="mt-2 h-2 bg-[#efebe5] w-[45%] animate-pulse" />
                    </div>
                  ))}

                {!isLoading && visibleProducts.length === 0 && (
                  <div className="sm:col-span-2 lg:col-span-3 h-[320px] flex flex-col items-center justify-center text-center border border-[#e2ded7] bg-[#fdfcf9]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d6cfc5] text-[#9c8460]">
                      <Icon name="search" className="h-[20px] w-[20px]" />
                    </div>
                    <p className="mt-4 font-['EB_Garamond',serif] text-[24px] italic text-[#4c4843]">
                      No pieces found.
                    </p>
                    <p className="mt-2 text-[11px] leading-relaxed text-[#928b83] max-w-[420px]">
                      Try another search term. If you’re a seller, open the
                      studio to add listings.
                    </p>
                    <button
                      type="button"
                      onClick={() => navigate("/seller/create-product")}
                      className="mt-4 bg-[#1d1d1b] text-white text-[9px] font-semibold uppercase tracking-[0.14em] px-5 py-2 hover:bg-black transition-colors"
                    >
                      Add a listing
                    </button>
                  </div>
                )}

                {!isLoading &&
                  visibleProducts.map((p) => {
                    const cover = p?.images?.[0];
                    const imageCount = p?.images?.length || 0;
                    return (
                      <article
                        key={p?._id || p?.title}
                        className="border border-[#e2ded7] bg-[#fdfcf9]"
                      >
                        <div className="aspect-[4/3] bg-[#e9e4dc] overflow-hidden">
                          {cover?.url ? (
                            <img
                              src={cover.url}
                              alt={cover.alt || p?.title || "Product"}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#aaa39a]">
                              <Icon name="image" className="h-7 w-7" />
                            </div>
                          )}
                        </div>

                        <div className="p-4">
                          <h3 className="font-['EB_Garamond',serif] text-[18px] leading-none text-[#252421] truncate">
                            {p?.title || "Untitled piece"}
                          </h3>
                          <p className="mt-2 text-[10px] uppercase tracking-[0.1em] text-[#9c968d] truncate">
                            {imageCount} {imageCount === 1 ? "image" : "images"}
                          </p>

                          <div className="mt-3 flex items-center justify-between gap-3">
                            <p className="font-['EB_Garamond',serif] text-[20px] text-[#1d1d1b]">
                              {formatPrice(
                                p?.price?.amount,
                                p?.price?.currency,
                              )}
                            </p>
                            <button
                              type="button"
                              onClick={() => navigate("/login")}
                              className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#1d1d1b] border-b border-transparent hover:border-[#1d1d1b] pb-1"
                            >
                              View
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
              </div>
            </div>
          </div>
        </main>

        {/* bottom strip */}
        <footer className="h-[22px] flex items-center justify-center text-[8px] uppercase tracking-[0.15em] text-[#aaa49c]">
          Snitch · Editorial catalog
        </footer>
      </div>
    </>
  );
};

export default Home;
