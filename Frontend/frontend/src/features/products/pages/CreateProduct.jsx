import React, { useState, useRef, useCallback } from "react";
import { useProduct } from "../hook/useProduct";
import { useNavigate } from "react-router";

const CURRENCIES = ["USD", "INR", "EUR", "GBP"];
const MAX_IMAGES = 7;

const CreateProduct = () => {
  const { createProductHandler } = useProduct();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priceAmount: "",
    priceCurrency: "USD",
  });
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addFiles = useCallback(
    (files) => {
      const remaining = MAX_IMAGES - images.length;
      if (remaining <= 0) return;
      const incoming = Array.from(files).slice(0, remaining);
      const newImages = incoming.map((file) => ({
        id: `${Date.now()}-${Math.random()}`,
        file,
        url: URL.createObjectURL(file),
      }));
      setImages((prev) => [...prev, ...newImages]);
    },
    [images.length]
  );

  const removeImage = (id) => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id);
      if (img) URL.revokeObjectURL(img.url);
      return prev.filter((i) => i.id !== id);
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const handleSubmit = async (e, asDraft = false) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const fd = new FormData();
      fd.append("title", formData.title);
      fd.append("description", formData.description);
      fd.append("priceAmount", formData.priceAmount);
      fd.append("priceCurrency", formData.priceCurrency);
      if (asDraft) fd.append("status", "draft");
      images.forEach((img) => fd.append("images", img.file));
      await createProductHandler(fd);
      setSubmitStatus("success");
      setTimeout(() => navigate("/"), 1200);
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const currencySymbol = { USD: "$", INR: "₹", EUR: "€", GBP: "£" };
  const pricePreview = formData.priceAmount
    ? `${currencySymbol[formData.priceCurrency] || ""}${parseFloat(
      formData.priceAmount
    ).toFixed(2)}`
    : `${currencySymbol[formData.priceCurrency] || ""}0.00`;

  const coverImage = images[0] || null;
  const secondaryImages = images.slice(1);
  const emptySlotsCount = Math.max(0, 6 - secondaryImages.length);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@400;500;600;700&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
        }
        .outline-text {
            -webkit-text-stroke: 1px #e4e2df;
            color: transparent;
        }
        input:focus, textarea:focus, select:focus {
            outline: none;
            border-bottom-color: #1b1c1a !important;
        }
        .custom-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .custom-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>

      <div className="bg-[#fbf9f6] text-[#1b1c1a] font-['Inter',sans-serif] custom-scrollbar min-h-screen max-w-[100vw] overflow-x-hidden">
        {/* Top Navigation Shell */}
        <header className="w-full bg-[#fbf9f6] border-b border-[#c6c7c1] z-50">
          <div className="flex justify-between items-center h-12 px-4 md:px-6 lg:px-8 xl:max-w-7xl xl:mx-auto xl:px-12">
            <div className="flex items-center gap-6">
              <a
                className="font-['EB_Garamond',serif] text-[22px] leading-[1.3] font-bold tracking-tight text-black"
                href="#"
              >
                Snitch.
              </a>
              <nav className="hidden md:flex items-center gap-3 text-[#454743] text-[11px] leading-[1.4] tracking-[0.05em] font-medium uppercase">
                <span className="hover:text-black cursor-pointer transition-colors">
                  Products
                </span>
                <span className="text-[#c6c7c1]">/</span>
                <span className="text-black font-bold">Create New</span>
              </nav>
            </div>
            <div className="flex items-center gap-6">
              <span className="material-symbols-outlined cursor-pointer text-[#454743] hover:text-black text-[20px]">
                account_circle
              </span>
            </div>
          </div>
        </header>

        {/* Ghost Banner */}
        <div className="relative w-full h-16 lg:h-20 overflow-hidden flex items-center justify-center bg-[#fbf9f6] select-none">
          <span className="font-['EB_Garamond',serif] italic text-[6rem] lg:text-[8rem] outline-text whitespace-nowrap opacity-50 uppercase leading-none">
            New Arrival New Arrival
          </span>
        </div>

        {/* Main Content Canvas */}
        <main className="w-full px-6 lg:px-10 py-10 lg:py-16">      
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 w-full items-start">





          {/* LEFT COLUMN (50%) */}
          <div className="w-full flex flex-col gap-8">
            <form
              onSubmit={(e) => handleSubmit(e, false)}
              className="flex flex-col gap-8 w-full"
            >
              {/* Section 01: Identity */}
              <section className="flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-[#e4e2df] pb-2">
                  <span className="font-['EB_Garamond',serif] text-[20px] leading-[1.3] italic text-[#1b1c1a] tracking-wide">
                    01 — Identity
                  </span>
                  <span className="material-symbols-outlined text-[#c6c7c1] text-sm">
                    info
                  </span>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="w-full relative">
                    <label className="block font-['Inter',sans-serif] text-[10px] leading-[1.4] tracking-[0.05em] font-medium text-[#c6c7c1] uppercase mb-1">
                      Product Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-0 border-b border-[#c6c7c1] py-2 px-0 font-['EB_Garamond',serif] text-[26px] leading-[1.2] italic text-black placeholder:text-[#c6c7c1] transition-all focus:ring-0 peer"
                      placeholder="The Midnight Velvet Blazer"
                    />
                  </div>
                  <div className="w-full relative">
                    <label className="block font-['Inter',sans-serif] text-[10px] leading-[1.4] tracking-[0.05em] font-medium text-[#c6c7c1] uppercase mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="3"
                      className="w-full bg-transparent border-0 border-b border-[#c6c7c1] py-2 px-0 font-['Inter',sans-serif] text-[13px] leading-[1.6] text-black placeholder:text-[#c6c7c1] transition-all focus:ring-0 resize-none peer"
                      placeholder="A masterpiece of tailoring, crafted from the finest Italian silk-velvet..."
                    ></textarea>
                  </div>
                </div>
              </section>

              {/* Section 02: Pricing */}
              <section className="flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-[#e4e2df] pb-2">
                  <span className="font-['EB_Garamond',serif] text-[20px] leading-[1.3] italic text-[#1b1c1a] tracking-wide">
                    02 — Pricing
                  </span>
                </div>
                <div className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="w-full relative">
                      <label className="block font-['Inter',sans-serif] text-[10px] leading-[1.4] tracking-[0.05em] font-medium text-[#c6c7c1] uppercase mb-1">
                        Amount
                      </label>
                      <input
                        type="number"
                        name="priceAmount"
                        value={formData.priceAmount}
                        onChange={handleChange}
                        required
                        min="0"
                        step="0.01"
                        className="w-full bg-transparent border-0 border-b border-[#c6c7c1] py-2 px-0 font-['EB_Garamond',serif] text-[26px] leading-[1.2] text-black placeholder:text-[#c6c7c1] transition-all focus:ring-0 peer"
                        placeholder="0.00"
                      />
                    </div>
                    <div className="w-full relative">
                      <label className="block font-['Inter',sans-serif] text-[10px] leading-[1.4] tracking-[0.05em] font-medium text-[#c6c7c1] uppercase mb-1">
                        Currency
                      </label>
                      <select
                        name="priceCurrency"
                        value={formData.priceCurrency}
                        onChange={handleChange}
                        className="w-full bg-transparent border-0 border-b border-[#c6c7c1] py-2 px-0 font-['EB_Garamond',serif] text-[20px] leading-[1.3] text-black appearance-none transition-all focus:ring-0 cursor-pointer peer"
                      >
                        {CURRENCIES.map((c) => (
                          <option
                            key={c}
                            value={c}
                            style={{ backgroundColor: "#fbf9f6" }}
                          >
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-['Inter',sans-serif] text-[10px] leading-[1.4] tracking-[0.05em] font-medium text-[#c6c7c1] uppercase">
                      Total Preview:
                    </span>
                    <span
                      className="font-['EB_Garamond',serif] text-[20px] leading-[1.3] text-[#1b1c1a]"
                      id="total-preview"
                    >
                      {pricePreview}
                    </span>
                  </div>
                </div>
              </section>

              {/* Section 03: Actions */}
              <section className="flex flex-col gap-3 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#1b1c1a] text-[#ffffff] font-['Inter',sans-serif] text-[12px] leading-[1.4] font-semibold uppercase py-3 rounded tracking-[0.15em] transition-all hover:bg-black active:scale-[0.99] border-none"
                >
                  {isSubmitting ? "Publishing..." : "Publish Product"}
                </button>
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e, true)}
                  disabled={isSubmitting}
                  className="w-full bg-transparent text-black font-['Inter',sans-serif] text-[12px] leading-[1.4] font-semibold uppercase py-1 rounded tracking-[0.1em] hover:underline transition-all"
                >
                  Save as Draft
                </button>
                {submitStatus === "success" && (
                  <p className="text-center font-['Inter',sans-serif] text-[11px] text-[#454743]">
                    Product created successfully. Redirecting...
                  </p>
                )}
                {submitStatus === "error" && (
                  <p className="text-center font-['Inter',sans-serif] text-[11px] text-[#ba1a1a]">
                    Something went wrong. Please try again.
                  </p>
                )}
              </section>
            </form>
          </div>

          {/* RIGHT COLUMN (50%) */}
          <aside className="w-full">
            <div className="sticky top-16 flex flex-col gap-5">
              <div className="flex items-end justify-between border-b border-[#e4e2df] pb-2">
                <h3 className="font-['EB_Garamond',serif] text-[20px] leading-[1.3] italic text-[#1b1c1a]">
                  Product Images
                </h3>
                <span className="font-['Inter',sans-serif] text-[10px] leading-[1.4] tracking-[0.05em] font-medium text-[#c6c7c1] uppercase">
                  {images.length} / {MAX_IMAGES} max
                </span>
              </div>

              {/* Primary Slot - Shorter for 768px screens */}
              <div className="w-full relative">
                {coverImage ? (
                  <div className="w-full aspect-[4/3] sm:aspect-[4/5] max-h-[300px] relative group border border-[#c6c7c1] bg-[#f5f3f0]">
                    <img
                      src={coverImage.url}
                      alt="Cover"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 px-2 py-1 bg-[#1b1c1a]">
                      <span className="text-[8px] uppercase tracking-[0.2em] text-[#ffffff] font-semibold">
                        Cover
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(coverImage.id)}
                      className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-[#1b1c1a] text-white rounded-full hover:bg-black"
                    >
                      <span className="material-symbols-outlined text-[11px]">
                        close
                      </span>
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`w-full aspect-[4/3] sm:aspect-[4/5] max-h-[300px] border border-[#c6c7c1] bg-[#f5f3f0] flex flex-col items-center justify-center gap-2 cursor-pointer group transition-colors ${isDragging ? "bg-[#efeeeb]" : "hover:bg-[#efeeeb]"
                      }`}
                  >
                    <div className="w-10 h-10 rounded-full border border-black flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all">
                      <span className="material-symbols-outlined text-[20px]">
                        add_a_photo
                      </span>
                    </div>
                    <div className="text-center">
                      <p className="font-['Inter',sans-serif] text-[11px] leading-[1.4] font-semibold text-[#454743] uppercase tracking-[0.1em]">
                        Upload Primary Cover
                      </p>
                      <p className="font-['Inter',sans-serif] text-[10px] leading-[1.4] text-[#c6c7c1] mt-1 italic">
                        High-res Portrait Recommended
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Secondary Slots Grid */}
              <div className="grid grid-cols-3 gap-3">
                {/* Render existing secondary images */}
                {secondaryImages.map((img) => (
                  <div
                    key={img.id}
                    className="aspect-square relative group border border-[#c6c7c1] bg-[#ffffff]"
                  >
                    <img
                      src={img.url}
                      alt="Product"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(img.id)}
                      className="absolute top-1.5 right-1.5 w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-[#1b1c1a] text-white rounded-full hover:bg-black"
                    >
                      <span className="material-symbols-outlined text-[11px]">
                        close
                      </span>
                    </button>
                  </div>
                ))}

                {/* Render empty slots to reach 6 total */}
                {Array.from({ length: emptySlotsCount }).map((_, i) => {
                  const isAllowed = images.length < MAX_IMAGES;
                  return (
                    <div
                      key={`empty-${i}`}
                      onClick={() => {
                        if (isAllowed) fileInputRef.current?.click();
                      }}
                      className={`aspect-square border border-[#c6c7c1] bg-[#ffffff] flex items-center justify-center transition-all group ${isAllowed
                        ? "cursor-pointer hover:border-black"
                        : "opacity-50"
                        }`}
                    >
                      <span className="material-symbols-outlined text-[#c6c7c1] group-hover:text-black transition-colors">
                        add
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => addFiles(e.target.files)}
              />

              {/* Tips */}
              <div className="p-4 bg-[#f5f3f0] border border-[#e4e2df]">
                <p className="font-['EB_Garamond',serif] text-[16px] leading-[1.3] italic text-[#1b1c1a] mb-1 tracking-wide">
                  Editor's Note
                </p>
                <p className="font-['Inter',sans-serif] text-[11px] leading-[1.6] text-[#454743] leading-relaxed">
                  Ensure lighting is natural and the background is neutral to
                  maintain the SNITCH aesthetic. We recommend at least 3
                  detail shots showing texture and craftsmanship.
                </p>
              </div>
            </div>
          </aside>
        </div>
        </main>

        {/* Footer Shell */}
        <footer className="w-full bg-[#fbf9f6] border-t border-[#c6c7c1] mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center py-4 px-4 md:px-6 lg:px-8 xl:max-w-7xl xl:mx-auto xl:px-12 gap-4">
            <span className="font-['EB_Garamond',serif] text-[24px] leading-[1.2] text-black font-bold">
              SNITCH
            </span>
            <div className="flex gap-4 font-['Inter',sans-serif] text-[10px] leading-[1.4] tracking-[0.05em] font-medium text-[#454743] uppercase tracking-widest">
              <a className="hover:text-black transition-colors" href="#">
                Terms of Service
              </a>
              <a className="hover:text-black transition-colors" href="#">
                Privacy Policy
              </a>
              <a className="hover:text-black transition-colors" href="#">
                Support
              </a>
            </div>
            <p className="font-['Inter',sans-serif] text-[10px] leading-[1.4] tracking-[0.05em] font-medium text-[#c6c7c1] uppercase tracking-widest">
              © {new Date().getFullYear()} SNITCH EDITORIAL. ALL RIGHTS
              RESERVED.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default CreateProduct;