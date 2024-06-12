import axios from 'axios';

const apiUrl = 'http://102.211.209.102:3001/api';

export const submitFeedback = async (feedbackData) => {
  try {
    const response = await axios.post(`${apiUrl}/feedback`, feedbackData);

    console.log('Retour soumis !', response.data);

    return response.data;
  } catch (error) {
    console.error('Erreur lors de la soumission du retour :', error);
    throw new Error('Erreur lors de la soumission du retour');
  }
};