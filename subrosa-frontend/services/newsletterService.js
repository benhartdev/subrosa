export const subscribeToNewsletter = async (email) => {
  try {
    const response = await fetch('http://localhost:5000/api/newsletter/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur abonnement newsletter :', error);
    return { message: 'Erreur de connexion' };
  }
};
