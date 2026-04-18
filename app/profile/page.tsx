"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Teacher {
  _id: string;
  name: string;
  subject: string;
  category: string;
  details: string;
  image: string;
  hourlyCharge: number;
}

export default function ProfilePage() {
  const router = useRouter();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [userId, setUserId] = useState("");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Successful");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const fetchTeachers = async () => {
    try {
      const res = await axios.get("/api/users/teacher");
      setTeachers(res.data.teachers);
    } catch (error: any) {
      toast.error("Failed to load teachers");
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      setUserId(res.data.data._id);
    } catch (error: any) {
      toast.error(error.response?.data?.error || error.message);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #f7f5f2;
          --surface: #ffffff;
          --border: #e8e4df;
          --ink: #1a1714;
          --ink-muted: #7a746e;
          --ink-light: #b0aaa4;
          --accent: #c8572a;
          --accent-soft: #fdf1ec;
          --green: #2d6a4f;
          --green-soft: #edf7f2;
          --blue: #1d4e89;
          --blue-soft: #eef3fb;
          --radius: 14px;
          --shadow: 0 1px 3px rgba(26,23,20,0.06), 0 4px 16px rgba(26,23,20,0.07);
          --shadow-hover: 0 2px 6px rgba(26,23,20,0.08), 0 8px 28px rgba(26,23,20,0.13);
        }

        body {
          font-family: 'DM Sans', sans-serif;
          background: var(--bg);
          color: var(--ink);
          -webkit-font-smoothing: antialiased;
        }

        .page-wrap {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        /* ── Header ── */
        .header {
          background: var(--surface);
          border-bottom: 1px solid var(--border);
          padding: 0 40px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header-brand {
          font-family: 'Playfair Display', serif;
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--ink);
        }

        .header-brand span {
          color: var(--accent);
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .btn-id {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--blue);
          background: var(--blue-soft);
          border: 1px solid rgba(29,78,137,0.15);
          padding: 7px 16px;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.15s, box-shadow 0.15s;
          letter-spacing: 0.01em;
        }

        .btn-id:hover {
          background: #dce8f7;
          box-shadow: 0 1px 4px rgba(29,78,137,0.12);
        }

        .btn-logout {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--accent);
          background: var(--accent-soft);
          border: 1px solid rgba(200,87,42,0.18);
          padding: 7px 16px;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.15s, box-shadow 0.15s;
          letter-spacing: 0.01em;
        }

        .btn-logout:hover {
          background: #fce4da;
          box-shadow: 0 1px 4px rgba(200,87,42,0.15);
        }

        /* ── ID badge ── */
        .id-banner {
          background: var(--blue-soft);
          border-bottom: 1px solid rgba(29,78,137,0.12);
          padding: 10px 40px;
          font-size: 0.8125rem;
          color: var(--blue);
          display: flex;
          align-items: center;
          gap: 8px;
          animation: slideDown 0.2s ease;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .id-banner strong {
          font-weight: 500;
          font-family: 'DM Sans', monospace;
          letter-spacing: 0.04em;
        }

        /* ── Hero ── */
        .hero {
          padding: 52px 40px 36px;
        }

        .hero-eyebrow {
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 10px;
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 3.5vw, 2.75rem);
          font-weight: 700;
          color: var(--ink);
          letter-spacing: -0.025em;
          line-height: 1.18;
          margin-bottom: 10px;
        }

        .hero-sub {
          font-size: 0.9375rem;
          color: var(--ink-muted);
          font-weight: 300;
        }

        .hero-divider {
          width: 48px;
          height: 2px;
          background: var(--accent);
          margin-top: 20px;
          border-radius: 2px;
        }

        /* ── Grid ── */
        .grid-section {
          padding: 0 40px 60px;
        }

        .teachers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
          gap: 24px;
        }

        /* ── Card ── */
        .teacher-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          overflow: hidden;
          box-shadow: var(--shadow);
          transition: transform 0.22s ease, box-shadow 0.22s ease;
          display: flex;
          flex-direction: column;
        }

        .teacher-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-hover);
        }

        /* Profile image container */
        .card-img-wrap {
          position: relative;
          padding: 28px 28px 0;
          display: flex;
          justify-content: center;
        }

        .card-img-ring {
          width: 96px;
          height: 96px;
          border-radius: 50%;
          padding: 3px;
          background: linear-gradient(135deg, var(--accent) 0%, #e8845c 100%);
          flex-shrink: 0;
        }

        .card-img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          background: var(--border);
          display: block;
          border: 2.5px solid var(--surface);
        }

        .card-img-fallback {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: linear-gradient(135deg, #e8e4df 0%, #d5cfc9 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Playfair Display', serif;
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--ink-muted);
          border: 2.5px solid var(--surface);
        }

        /* Card body */
        .card-body {
          padding: 18px 24px 24px;
          display: flex;
          flex-direction: column;
          flex: 1;
          text-align: center;
        }

        .card-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--ink);
          letter-spacing: -0.015em;
          line-height: 1.25;
          margin-bottom: 4px;
        }

        .card-subject {
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--blue);
          margin-bottom: 6px;
          letter-spacing: 0.01em;
        }

        .card-category {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--ink-muted);
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 100px;
          padding: 3px 10px;
          margin-bottom: 12px;
        }

        .card-divider {
          width: 28px;
          height: 1px;
          background: var(--border);
          margin: 0 auto 12px;
        }

        .card-details {
          font-size: 0.855rem;
          color: var(--ink-muted);
          line-height: 1.6;
          font-weight: 300;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin-bottom: 16px;
          flex: 1;
        }

        .card-footer {
          border-top: 1px solid var(--border);
          padding-top: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .card-rate {
          font-family: 'Playfair Display', serif;
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--green);
        }

        .card-rate-label {
          font-size: 0.75rem;
          color: var(--ink-light);
          font-weight: 400;
        }

        /* ── Empty state ── */
        .empty {
          grid-column: 1 / -1;
          text-align: center;
          padding: 80px 0;
          color: var(--ink-muted);
        }

        .empty-icon {
          font-size: 2.5rem;
          margin-bottom: 12px;
          opacity: 0.35;
        }

        .empty-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.25rem;
          color: var(--ink);
          margin-bottom: 6px;
        }

        .empty-sub {
          font-size: 0.875rem;
        }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .header { padding: 0 20px; }
          .hero { padding: 36px 20px 24px; }
          .grid-section { padding: 0 20px 48px; }
          .id-banner { padding: 10px 20px; }
        }
      `}</style>

      <div className="page-wrap">

        {/* Header */}
        <header className="header">
          <div className="header-brand">Education<span>Connect</span></div>
          <div className="header-actions">
            <button className="btn-id" onClick={getUserDetails}>
              Get My ID
            </button>
            <button className="btn-logout" onClick={logout}>
              Sign out
            </button>
          </div>
        </header>

        {/* ID banner */}
        {userId && (
          <div className="id-banner">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="5" width="20" height="14" rx="2"/><path d="M16 10h.01M8 10h.01M12 14h.01"/>
            </svg>
            Your ID: <strong>{userId}</strong>
          </div>
        )}

        {/* Hero */}
        <section className="hero">
          <p className="hero-eyebrow">Directory</p>
          <h1 className="hero-title">Our Teachers</h1>
          <p className="hero-sub">Browse expert tutors and find the right fit for you.</p>
          <div className="hero-divider" />
        </section>

        {/* Grid */}
        <section className="grid-section">
          <div className="teachers-grid">
            {teachers.length === 0 ? (
              <div className="empty">
                <div className="empty-icon">📭</div>
                <p className="empty-title">No teachers yet</p>
                <p className="empty-sub">Check back soon — we're onboarding educators.</p>
              </div>
            ) : (
              teachers.map((teacher) => (
                <div key={teacher._id} className="teacher-card">

                  {/* Profile image */}
                  <div className="card-img-wrap">
                    <div className="card-img-ring">
                      {teacher.image ? (
                        <img
                          src={teacher.image}
                          alt={teacher.name}
                          className="card-img"
                        />
                      ) : (
                        <div className="card-img-fallback">
                          {teacher.name.charAt(0)}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="card-body">
                    <h2 className="card-name">{teacher.name}</h2>
                    <p className="card-subject">{teacher.subject}</p>
                    <span className="card-category">{teacher.category}</span>
                    <div className="card-divider" />
                    <p className="card-details">{teacher.details}</p>

                    <div className="card-footer">
                      <span className="card-rate">₹{teacher.hourlyCharge}</span>
                      <span className="card-rate-label">/ hour</span>
                    </div>
                  </div>

                </div>
              ))
            )}
          </div>
        </section>

      </div>
    </>
  );
}