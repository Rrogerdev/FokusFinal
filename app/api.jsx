const apiUrl = 'http://10.0.2.2:8419'
// const apiUrl = 'http://localhost:8419'

export async function Post(route, body, token = null) {
  try {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${apiUrl}/${route}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    const data = await response.json();
    
    if (!response.ok){
      return false
    }



    return data;
  } catch (error) {
    console.error('Erro ao enviar dados:', error);
    return null;
  }
}

export async function Get(route, token = null) {
  try {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${apiUrl}/${route}`, {
      method: 'GET',
      headers,
    });

    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error('Erro na requisição:', error);
    return null;
  }
}