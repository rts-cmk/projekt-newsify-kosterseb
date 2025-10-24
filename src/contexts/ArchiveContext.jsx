import React, { createContext, useContext, useState, useEffect } from 'react';

const ArchiveContext = createContext();

export const useArchive = () => {
  const context = useContext(ArchiveContext);
  if (!context) {
    throw new Error('useArchive must be used within an ArchiveProvider');
  }
  return context;
};

export const ArchiveProvider = ({ children }) => {
  const [archivedArticles, setArchivedArticles] = useState(() => {
    const saved = localStorage.getItem('newsify-archived-articles');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('newsify-archived-articles', JSON.stringify(archivedArticles));
  }, [archivedArticles]);

  const addToArchive = (article) => {
    setArchivedArticles(prev => {
      // Check if already archived
      if (prev.some(a => a.id === article.id)) {
        return prev;
      }
      return [...prev, { ...article, archivedAt: new Date().toISOString() }];
    });
  };

  const removeFromArchive = (articleId) => {
    setArchivedArticles(prev => prev.filter(a => a.id !== articleId));
  };

  const isArchived = (articleId) => {
    return archivedArticles.some(a => a.id === articleId);
  };

  const getArchivedByCategory = (category) => {
    return archivedArticles.filter(article => 
      article.section?.toUpperCase() === category.toUpperCase()
    );
  };

  return (
    <ArchiveContext.Provider 
      value={{ 
        archivedArticles, 
        addToArchive, 
        removeFromArchive, 
        isArchived,
        getArchivedByCategory 
      }}
    >
      {children}
    </ArchiveContext.Provider>
  );
};

export default ArchiveContext;