import React, { useState, useEffect } from "react";

function CharacterDossier() {
  const [idInput, setIdInput] = useState(1);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState("");
  const [isDead, setIsDead] = useState(false);
  const [showStatus, setShowStatus] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchCharacterById(id) {
    if (!id || id < 1) {
      setError("Enter a valid ID (1+)");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
      if (!res.ok) throw new Error(`Character ${id} not found`);
      const data = await res.json();
      setName(data.name || "");
      setStatus(data.status || "");
      setImage(data.image || "");
      setIsDead(data.status === "Dead");
    } catch (err) {
      setError(err.message || "Failed to fetch character");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCharacterById(1);
  }, []);

  function handleFetchClick() {
    fetchCharacterById(Number(idInput));
  }

  function handleToggleStatus() {
    if (status === "Dead") {
      setStatus("Alive");
      setIsDead(false);
    } else if (status === "Alive") {
      setStatus("Dead");
      setIsDead(true);
    } else {
      // Unknown status: flip isDead and set a textual status
      setIsDead((s) => !s);
      setStatus((s) => (s === "Dead" ? "Alive" : "Dead"));
    }
  }

  return (
    <div className={`character-dossier ${isDead ? "deceased" : ""}`} role="region" aria-label="Character card">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleFetchClick();
        }}
        style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 10 }}
      >
        <input
          type="number"
          min="1"
          className="id-input"
          value={idInput}
          onChange={(e) => setIdInput(e.target.value)}
          aria-label="Character ID"
        />
        <button type="submit" className="fetch-button" disabled={loading}>
          {loading ? "Fetching..." : "Fetch Character"}
        </button>
      </form>

      {error && <p className="error-text">{error}</p>}

      {image && (
        <div className="character-image-wrap">
          <img src={image} alt={name} className="character-image" />
        </div>
      )}
      <h2 className="character-name">{name}</h2>

      <div className="character-controls">
        <button type="button" className="toggle-status" onClick={() => setShowStatus((s) => !s)}>
          {showStatus ? "Hide status" : "Show status"}
        </button>
        <button type="button" className="toggle-status" onClick={handleToggleStatus} style={{ marginLeft: 8 }}>
          Alive/Dead  
        </button>
      </div>

      {showStatus && (
        <p className="character-status">
          Status: <span className={isDead ? "status-badge dead" : "status-badge alive"}>{status}</span>
        </p>
      )}
    </div>
  );
}

export default CharacterDossier;
