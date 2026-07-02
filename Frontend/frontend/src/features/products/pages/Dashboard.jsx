import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useProduct } from "../hook/useProduct";

const Icon = ({ name, className = "h-5 w-5" }) => {
  const paths = {
    dashboard: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
    products: (
      <>
        <path d="m16.5 9.4-9-5.2" />
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="M3.3 7 12 12l8.7-5" />
        <path d="M12 22V12" />
      </>
    ),
    plus: (
      <>
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </>
    ),
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
    sparkles: (
      <>
        <path d="m12 3-1.1 3.1a4 4 0 0 1-2.5 2.5L5.3 9.7l3.1 1.1a4 4 0 0 1 2.5 2.5L12 16.4l1.1-3.1a4 4 0 0 1 2.5-2.5l3.1-1.1-3.1-1.1a4 4 0 0 1-2.5-2.5L12 3Z" />
        <path d="m19 17-.5 1.4a2 2 0 0 1-1.2 1.2l-1.4.5 1.4.5a2 2 0 0 1 1.2 1.2l.5 1.4.5-1.4a2 2 0 0 1 1.2-1.2l1.4-.5-1.4-.5a2 2 0 0 1-1.2-1.2L19 17Z" />
      </>
    ),
    logout: (
      <>
        <path d="M10 17l5-5-5-5" />
        <path d="M15 12H3" />
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
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

const StatCard = ({ eyebrow, value, note, accent = false }) => (
  <article
    className={`relative min-w-0 overflow-hidden border px-5 py-4 ${
      accent
        ? "border-[#1d1d1b] bg-[#1d1d1b] text-white"
        : "border-[#ddd8d1] bg-[#fdfcf9] text-[#1d1d1b]"
    }`}
  >
    <p
      className={`text-[9px] font-semibold uppercase tracking-[0.18em] ${
        accent ? "text-[#d7c5a3]" : "text-[#8c867e]"
      }`}
    >
      {eyebrow}
    </p>
    <div className="mt-2 flex items-end justify-between gap-3">
      <p className="truncate font-['EB_Garamond',serif] text-[29px] leading-none">
        {value}
      </p>
      <p
        className={`mb-0.5 shrink-0 text-[9px] uppercase tracking-[0.1em] ${
          accent ? "text-[#aaa59d]" : "text-[#9a958e]"
        }`}
      >
        {note}
      </p>
    </div>
    {accent && (
      <span className="absolute -right-3 -top-4 font-['EB_Garamond',serif] text-[78px] italic leading-none text-white/[0.04]">
        S
      </span>
    )}
  </article>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const { getSellerProductHandller } = useProduct();
  const fetchProducts = useRef(getSellerProductHandller);
  const sellerProduct = useSelector((state) => state.product.sellerproduct);
  const user = useSelector((state) => state.auth.user);

  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const loadProducts = async () => {
    setIsLoading(true);
    setLoadError("");
    try {
      await fetchProducts.current();
    } catch {
      setLoadError("We couldn't load your collection. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isActive = true;

    fetchProducts
      .current()
      .catch(() => {
        if (isActive) {
          setLoadError("We couldn't load your collection. Please try again.");
        }
      })
      .finally(() => {
        if (isActive) setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, []);

  const products = Array.isArray(sellerProduct) ? sellerProduct : [];

  const summary = useMemo(() => {
    const now = new Date();
    const complete = products.filter((product) => product.images?.length >= 3).length;
    const newThisMonth = products.filter((product) => {
      const created = new Date(product.createdAt);
      return (
        !Number.isNaN(created.getTime()) &&
        created.getMonth() === now.getMonth() &&
        created.getFullYear() === now.getFullYear()
      );
    }).length;
    const currencies = [...new Set(products.map((p) => p.price?.currency || "INR"))];
    const catalogValue = products.reduce(
      (total, product) => total + (Number(product.price?.amount) || 0),
      0,
    );

    return {
      complete,
      newThisMonth,
      coverage: products.length ? Math.round((complete / products.length) * 100) : 0,
      catalogValue:
        currencies.length <= 1
          ? formatPrice(catalogValue, currencies[0] || "INR")
          : `${currencies.length} currencies`,
    };
  }, [products]);

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesQuery =
        !normalizedQuery ||
        product.title?.toLowerCase().includes(normalizedQuery) ||
        product.description?.toLowerCase().includes(normalizedQuery);
      const imageCount = product.images?.length || 0;
      const matchesFilter =
        filter === "all" ||
        (filter === "complete" && imageCount >= 3) ||
        (filter === "needs-media" && imageCount < 3);
      return matchesQuery && matchesFilter;
    });
  }, [products, query, filter]);

  const firstName = user?.fullname?.split(" ")[0] || "Designer";
  const initials = user?.fullname
    ? user.fullname
        .split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "SN";

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <div className="h-screen min-h-[640px] w-full overflow-hidden bg-[#f4f1ec] font-['Inter',sans-serif] text-[#1d1d1b] selection:bg-[#c9a96e]/30">
        <div className="flex h-full">
          <aside className="hidden h-full w-[218px] shrink-0 flex-col border-r border-[#ded9d1] bg-[#ebe7df] lg:flex">
            <div className="flex h-[70px] items-center border-b border-[#ded9d1] px-7">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="font-['EB_Garamond',serif] text-[25px] font-semibold tracking-[-0.03em] text-black"
              >
                Snitch<span className="text-[#ad8c50]">.</span>
              </button>
            </div>

            <nav className="flex-1 px-4 py-7" aria-label="Seller navigation">
              <p className="mb-3 px-3 text-[8px] font-semibold uppercase tracking-[0.2em] text-[#9c968e]">
                Workspace
              </p>
              <button
                type="button"
                className="flex w-full items-center gap-3 bg-[#1d1d1b] px-3 py-3 text-left text-[11px] font-medium text-white"
              >
                <Icon name="dashboard" className="h-[17px] w-[17px]" />
                Overview
              </button>
              <button
                type="button"
                onClick={() => document.getElementById("collection")?.scrollIntoView()}
                className="mt-1 flex w-full items-center gap-3 px-3 py-3 text-left text-[11px] font-medium text-[#5f5b55] transition-colors hover:bg-white/50 hover:text-black"
              >
                <Icon name="products" className="h-[17px] w-[17px]" />
                Products
                <span className="ml-auto text-[9px] text-[#969087]">{products.length}</span>
              </button>

              <div className="my-6 h-px bg-[#dad5cd]" />

              <p className="mb-3 px-3 text-[8px] font-semibold uppercase tracking-[0.2em] text-[#9c968e]">
                Quick action
              </p>
              <button
                type="button"
                onClick={() => navigate("/seller/create-product")}
                className="flex w-full items-center gap-3 border border-[#d1cbc1] bg-[#f7f4ef] px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.08em] transition-colors hover:border-[#1d1d1b]"
              >
                <Icon name="plus" className="h-4 w-4" />
                New listing
              </button>
            </nav>

            <div className="border-t border-[#d8d3ca] p-4">
              <div className="flex items-center gap-3 px-2 py-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#c9a96e] text-[9px] font-semibold tracking-wider text-white">
                  {initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[10px] font-semibold text-[#2c2b29]">
                    {user?.fullname || "Snitch Seller"}
                  </p>
                  <p className="mt-0.5 text-[8px] uppercase tracking-[0.12em] text-[#989187]">
                    Seller account
                  </p>
                </div>
                <Icon name="logout" className="h-4 w-4 text-[#8d877e]" />
              </div>
            </div>
          </aside>

          <section className="flex min-w-0 flex-1 flex-col">
            <header className="flex h-[70px] shrink-0 items-center justify-between border-b border-[#ded9d1] bg-[#f8f6f2] px-5 sm:px-8 lg:px-10">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="font-['EB_Garamond',serif] text-[23px] font-semibold tracking-tight text-black lg:hidden"
              >
                Snitch.
              </button>
              <div className="hidden items-center gap-2 lg:flex">
                <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#9b958d]">
                  Seller studio
                </span>
                <span className="text-[#c5beb4]">/</span>
                <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#292826]">
                  Dashboard
                </span>
              </div>
              <div className="flex items-center gap-4">
                <p className="hidden text-[10px] text-[#817b73] sm:block">
                  {new Intl.DateTimeFormat("en-GB", {
                    weekday: "short",
                    day: "2-digit",
                    month: "short",
                  }).format(new Date())}
                </p>
                <div className="h-5 w-px bg-[#ddd8d0]" />
                <button
                  type="button"
                  onClick={() => navigate("/seller/create-product")}
                  className="flex items-center gap-2 bg-[#1d1d1b] px-4 py-2.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-black"
                >
                  <Icon name="plus" className="h-3.5 w-3.5" />
                  Add product
                </button>
              </div>
            </header>

            <main className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-8 lg:px-10 lg:py-6">
              <div className="mx-auto max-w-[1120px]">
                <section className="flex items-end justify-between gap-8">
                  <div>
                    <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#ad8c50]">
                      Collection overview
                    </p>
                    <h1 className="font-['EB_Garamond',serif] text-[39px] leading-none tracking-[-0.025em] text-[#1d1d1b]">
                      Good day, <em className="font-normal text-[#71685e]">{firstName}.</em>
                    </h1>
                  </div>
                  <p className="hidden max-w-[280px] text-right text-[10px] leading-[1.6] text-[#8a847c] md:block">
                    Your edit, at a glance. Refine the collection and keep every listing editorial-ready.
                  </p>
                </section>

                <section className="mt-5 grid grid-cols-2 gap-2.5 md:grid-cols-4">
                  <StatCard
                    eyebrow="Total listings"
                    value={isLoading ? "—" : products.length}
                    note={`${summary.newThisMonth} this month`}
                    accent
                  />
                  <StatCard
                    eyebrow="Catalog value"
                    value={isLoading ? "—" : summary.catalogValue}
                    note="at list price"
                  />
                  <StatCard
                    eyebrow="Editorial ready"
                    value={isLoading ? "—" : summary.complete}
                    note="3+ images"
                  />
                  <StatCard
                    eyebrow="Media coverage"
                    value={isLoading ? "—" : `${summary.coverage}%`}
                    note="of catalog"
                  />
                </section>

                <section id="collection" className="mt-5 border border-[#ddd8d1] bg-[#fdfcf9]">
                  <div className="flex flex-col gap-3 border-b border-[#e2ded7] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="font-['EB_Garamond',serif] text-[23px] leading-none">
                        The collection
                      </h2>
                      <p className="mt-1.5 text-[9px] text-[#99938b]">
                        {visibleProducts.length} of {products.length} listings
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <label className="flex h-8 min-w-[180px] items-center gap-2 border border-[#ded9d1] bg-white px-3 focus-within:border-[#80796f]">
                        <Icon name="search" className="h-3.5 w-3.5 text-[#8c867f]" />
                        <span className="sr-only">Search products</span>
                        <input
                          value={query}
                          onChange={(event) => setQuery(event.target.value)}
                          placeholder="Search collection"
                          className="w-full border-0 bg-transparent p-0 text-[10px] text-[#2a2927] outline-none placeholder:text-[#aaa49b] focus:ring-0"
                        />
                      </label>
                      <select
                        aria-label="Filter listings"
                        value={filter}
                        onChange={(event) => setFilter(event.target.value)}
                        className="h-8 border border-[#ded9d1] bg-white px-3 text-[9px] font-medium uppercase tracking-[0.08em] text-[#5f5a54] outline-none"
                      >
                        <option value="all">All listings</option>
                        <option value="complete">Editorial ready</option>
                        <option value="needs-media">Needs media</option>
                      </select>
                    </div>
                  </div>

                  <div className="hidden grid-cols-[minmax(260px,1fr)_140px_110px_100px_38px] gap-4 border-b border-[#ece8e2] bg-[#f8f6f2] px-5 py-2.5 text-[8px] font-semibold uppercase tracking-[0.16em] text-[#99938b] md:grid">
                    <span>Product</span>
                    <span>Price</span>
                    <span>Media</span>
                    <span>Status</span>
                    <span />
                  </div>

                  <div className="max-h-[252px] overflow-y-auto">
                    {isLoading && (
                      <div className="space-y-px p-2">
                        {[0, 1, 2].map((item) => (
                          <div key={item} className="flex animate-pulse items-center gap-4 px-3 py-2.5">
                            <div className="h-11 w-9 bg-[#e8e3dc]" />
                            <div className="flex-1">
                              <div className="h-2.5 w-40 bg-[#e8e3dc]" />
                              <div className="mt-2 h-2 w-24 bg-[#efebe5]" />
                            </div>
                            <div className="h-2.5 w-20 bg-[#e8e3dc]" />
                          </div>
                        ))}
                      </div>
                    )}

                    {!isLoading && loadError && (
                      <div className="flex min-h-[205px] flex-col items-center justify-center px-6 text-center">
                        <p className="font-['EB_Garamond',serif] text-xl italic text-[#4c4843]">
                          A small snag in the studio.
                        </p>
                        <p className="mt-1.5 text-[10px] text-[#928b83]">{loadError}</p>
                        <button
                          type="button"
                          onClick={loadProducts}
                          className="mt-4 border-b border-[#1d1d1b] pb-0.5 text-[9px] font-semibold uppercase tracking-[0.12em]"
                        >
                          Try again
                        </button>
                      </div>
                    )}

                    {!isLoading && !loadError && visibleProducts.length === 0 && (
                      <div className="flex min-h-[205px] flex-col items-center justify-center px-6 text-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d6cfc5] text-[#9c8460]">
                          <Icon name={products.length ? "search" : "sparkles"} className="h-[18px] w-[18px]" />
                        </div>
                        <p className="mt-3 font-['EB_Garamond',serif] text-xl italic text-[#4c4843]">
                          {products.length ? "No pieces found." : "Your collection starts here."}
                        </p>
                        <p className="mt-1 max-w-[330px] text-[10px] leading-relaxed text-[#928b83]">
                          {products.length
                            ? "Try another search or loosen the collection filter."
                            : "Add your first piece and begin shaping the story of your store."}
                        </p>
                        {!products.length && (
                          <button
                            type="button"
                            onClick={() => navigate("/seller/create-product")}
                            className="mt-4 flex items-center gap-2 bg-[#1d1d1b] px-4 py-2.5 text-[8px] font-semibold uppercase tracking-[0.14em] text-white"
                          >
                            Create first listing
                            <Icon name="arrow" className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    )}

                    {!isLoading &&
                      !loadError &&
                      visibleProducts.map((product) => {
                        const imageCount = product.images?.length || 0;
                        const cover = product.images?.[0];
                        return (
                          <article
                            key={product._id || product.title}
                            className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-[#ece8e2] px-5 py-2.5 last:border-b-0 md:grid-cols-[minmax(260px,1fr)_140px_110px_100px_38px]"
                          >
                            <div className="flex min-w-0 items-center gap-3">
                              <div className="flex h-11 w-9 shrink-0 items-center justify-center overflow-hidden bg-[#e9e4dc] text-[#aaa39a]">
                                {cover?.url ? (
                                  <img
                                    src={cover.url}
                                    alt={cover.alt || product.title}
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <Icon name="image" className="h-4 w-4" />
                                )}
                              </div>
                              <div className="min-w-0">
                                <h3 className="truncate font-['EB_Garamond',serif] text-[15px] font-medium text-[#252421]">
                                  {product.title || "Untitled piece"}
                                </h3>
                                <p className="mt-0.5 truncate text-[8px] uppercase tracking-[0.1em] text-[#9c968d]">
                                  Added {product.createdAt ? new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(product.createdAt)) : "recently"}
                                </p>
                              </div>
                            </div>
                            <p className="text-right font-['EB_Garamond',serif] text-[15px] md:text-left">
                              {formatPrice(product.price?.amount, product.price?.currency)}
                            </p>
                            <div className="hidden items-center gap-1.5 text-[9px] text-[#716b64] md:flex">
                              <Icon name="image" className="h-3.5 w-3.5 text-[#9d968d]" />
                              {imageCount} {imageCount === 1 ? "image" : "images"}
                            </div>
                            <div className="hidden md:block">
                              <span className="inline-flex items-center gap-1.5 text-[8px] font-semibold uppercase tracking-[0.1em] text-[#52634f]">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#73846e]" />
                                Live
                              </span>
                            </div>
                            <span className="hidden h-7 w-7 items-center justify-center text-[#817a72] md:flex">
                              <Icon name="arrow" className="h-3.5 w-3.5" />
                            </span>
                          </article>
                        );
                      })}
                  </div>
                </section>

                <p className="mt-3 text-center text-[8px] uppercase tracking-[0.15em] text-[#aaa49c]">
                  Snitch seller studio · The art of the edit
                </p>
              </div>
            </main>
          </section>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
