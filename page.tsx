"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function NewDocumentPage() {
  const router = useRouter();

  const [titol, setTitol] = useState("");
  const [tipus, setTipus] = useState("");
  const [dataDocument, setDataDocument] = useState("");
  const [origen, setOrigen] = useState("");
  const [storageProvider, setStorageProvider] = useState("");
  const [storagePath, setStoragePath] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("documents").insert({
      titol,
      tipus,
      data_document: dataDocument || null,
      origen,
      storage_provider: storageProvider,
      storage_path: storagePath,
      metadades: {
        notes,
      },
      creat_el: new Date().toISOString(),
      actualitzat_el: new Date().toISOString(),
    });

    setLoading(false);

    if (!error) {
      router.push("/documents");
    } else {
      alert("Error: " + error.message);
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Afegir document</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block font-medium">Títol</label>
          <input
            className="w-full border p-2 rounded"
            value={titol}
            onChange={(e) => setTitol(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Tipus</label>
          <input
            className="w-full border p-2 rounded"
            value={tipus}
            onChange={(e) => setTipus(e.target.value)}
            placeholder="Factura, contracte, DNI..."
          />
        </div>

        <div>
          <label className="block font-medium">Data del document</label>
          <input
            type="date"
            className="w-full border p-2 rounded"
            value={dataDocument}
            onChange={(e) => setDataDocument(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium">Origen</label>
          <input
            className="w-full border p-2 rounded"
            value={origen}
            onChange={(e) => setOrigen(e.target.value)}
            placeholder="Empresa, institució, persona..."
          />
        </div>

        <div>
          <label className="block font-medium">Storage provider</label>
          <input
            className="w-full border p-2 rounded"
            value={storageProvider}
            onChange={(e) => setStorageProvider(e.target.value)}
            placeholder="supabase, drive, mega, local..."
            required
          />
        </div>

        <div>
          <label className="block font-medium">Ruta / Path</label>
          <input
            className="w-full border p-2 rounded"
            value={storagePath}
            onChange={(e) => setStoragePath(e.target.value)}
            placeholder="URL o ruta local"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Notes / Metadades</label>
          <textarea
            className="w-full border p-2 rounded"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Qualsevol informació addicional"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Guardant..." : "Guardar document"}
        </button>
      </form>
    </div>
  );
}
