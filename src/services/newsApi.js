
// NY Times API Service
const API_KEY = import.meta.env.VITE_NYT_API_KEY;
const BASE_URL = 'https://api.nytimes.com/svc';

// Map our categories to NY Times sections
const CATEGORY_MAP = {
  EUROPE: 'world',
  HEALTH: 'health',
  SPORT: 'sports',
  BUSINESS: 'business',
  TRAVEL: 'travel'
};

export const newsApi = {
  // Get top stories by section
  async getTopStories(section = 'home') {
    try {
      const nytSection = CATEGORY_MAP[section] || section.toLowerCase();
      const response = await fetch(
        `${BASE_URL}/topstories/v2/${nytSection}.json?api-key=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      
      const data = await response.json();
      return this.formatArticles(data.results);
    } catch (error) {
      console.error('Error fetching top stories:', error);
      return [];
    }
  },

  // Search articles
  async searchArticles(query) {
    try {
      const response = await fetch(
        `${BASE_URL}/search/v2/articlesearch.json?q=${encodeURIComponent(query)}&api-key=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to search articles');
      }
      
      const data = await response.json();
      return this.formatSearchResults(data.response.docs);
    } catch (error) {
      console.error('Error searching articles:', error);
      return [];
    }
  },

  // Format articles to consistent structure
  formatArticles(articles) {
    return articles.slice(0, 10).map(article => ({
      id: article.uri || article.url,
      title: article.title,
      description: article.abstract,
      image: article.multimedia?.[0]?.url || null,
      url: article.url,
      section: article.section,
      publishedDate: article.published_date,
      byline: article.byline
    }));
  },

  // Format search results
  formatSearchResults(articles) {
    return articles.slice(0, 10).map(article => ({
      id: article._id,
      title: article.headline.main,
      description: article.abstract || article.snippet,
      image: article.multimedia?.[0]?.url 
        ? `https://www.nytimes.com/${article.multimedia[0].url}`
        : null,
      url: article.web_url,
      section: article.section_name,
      publishedDate: article.pub_date,
      byline: article.byline?.original
    }));
  }
};

export default newsApi;