import { createContext, useContext, useState, useCallback } from "react";

const DataContext = createContext(null);

const newId = (prefix) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
const formatDate = () =>
  new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  });

const DEFAULT_FOLDER_COLOR =
  "bg-gradient-to-br from-emerald-300 via-teal-300 to-cyan-300";

export function DataProvider({ children }) {
  const [journals, setJournals] = useState([]);
  const [folders, setFolders] = useState([]);

  const addJournal = useCallback((journal) => {
    const entry = {
      id: journal.id || newId("jid"),
      title: journal.title || "Untitled",
      content: journal.content || "",
      date: journal.date || formatDate(),
      folderId: journal.folderId ?? null,
    };
    setJournals((prev) => {
      const exists = prev.some((j) => j.id === entry.id);
      if (exists) {
        return prev.map((j) => (j.id === entry.id ? entry : j));
      }
      return [...prev, entry];
    });
    return entry.id;
  }, []);

  const updateJournal = useCallback((id, updates) => {
    setJournals((prev) =>
      prev.map((j) => (j.id === id ? { ...j, ...updates } : j))
    );
  }, []);

  const getJournalById = useCallback(
    (id) => journals.find((j) => j.id === id),
    [journals]
  );

  const addFolder = useCallback((folder) => {
    const entry = {
      id: folder.id || newId("fid"),
      name: (folder.name || folder.title || "").trim() || "New Folder",
      description: (folder.description || "").trim() || "",
      color: folder.color || DEFAULT_FOLDER_COLOR,
    };
    setFolders((prev) => (prev.some((f) => f.id === entry.id) ? prev : [...prev, entry]));
    return entry.id;
  }, []);

  const updateFolder = useCallback((id, updates) => {
    setFolders((prev) => prev.map((f) => (f.id === id ? { ...f, ...updates } : f)));
  }, []);

  const deleteFolder = useCallback((id) => {
    setFolders((prev) => prev.filter((f) => f.id !== id));
    setJournals((prev) => prev.filter((j) => j.folderId !== id));
  }, []);

  const getFolderById = useCallback(
    (id) => folders.find((f) => f.id === id),
    [folders]
  );

  const journalsInFolder = useCallback(
    (folderId) => {
      if (folderId == null) return journals.filter((j) => j.folderId == null);
      return journals.filter((j) => j.folderId === folderId);
    },
    [journals]
  );

  const rootJournals = journals.filter((j) => j.folderId == null);

  const value = {
    journals,
    folders,
    rootJournals,
    addJournal,
    updateJournal,
    getJournalById,
    addFolder,
    updateFolder,
    deleteFolder,
    getFolderById,
    journalsInFolder,
  };

  return (
    <DataContext.Provider value={value}>{children}</DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}
