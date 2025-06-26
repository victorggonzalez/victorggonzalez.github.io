import classes from "./ContactForm.styles.css";
import React, { useState } from "react";

const ContactForm = () => {
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    const form = e.currentTarget as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) });
      if (res.ok) setStatus('success'); else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={classes.form}>
        <div className={classes.row}>
          <p>
            <label htmlFor="name">Your name</label>
            <input type="text" id="name" name="name" required />
          </p>
          <p>
            <label htmlFor="email">Your email</label>
            <input type="email" id="email" name="email" required />
          </p>
        </div>
        <p>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" required />
        </p>
        <p>
          <label htmlFor="summary">Short Summary</label>
          <input type="text" id="summary" name="summary" required />
        </p>
        <p>
          <label htmlFor="instructions">Instructions</label>
          <textarea
            id="instructions"
            name="instructions"
            rows={10}
            required
          ></textarea>
        </p>
        <button type="submit" className={classes.button} disabled={status==='loading'}>
          {status==='loading' ? 'Sending...' : 'Send Message'}
        </button>
        {status==='success' && <p className="text-green-500">Thank you! Your message was sent.</p>}
        {status==='error' && <p className="text-red-500">Submission failed. Please try again.</p>}
      </form>
    </div>
  );
};

export default ContactForm;
