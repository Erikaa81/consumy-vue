import { Auth } from './auth'

interface BuyerResponse {
    
  buyer: { email: string };
}

async function getBuyers(): Promise<{ buyers: BuyerResponse[]; message?: string }> {
  const auth = new Auth();
  const currentUser = auth.currentUser();
  const token = currentUser?.token;

  try {
    const response = await fetch('http://127.0.0.1:3000/buyers', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { buyers: [], message: errorData.message || 'Failed to fetch buyers' };
    }

    const buyers = await response.json();
    return { buyers };
  } catch (error) {
    return { buyers: [], message: 'An error occurred' };
  }
}

async function editBuyer(email: string, buyer_id: any): Promise<{ success: boolean; message?: string }> {
  const auth = new Auth();
  const currentUser = auth.currentUser();
  const token = currentUser?.token;

  const body = {
    buyer: {
        id: buyer_id,
      email: email
    }
  };

  try {
    const response = await fetch(`http://127.0.0.1:3000/buyers/${buyer_id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.message || 'Failed to edit buyer' };
    }

    return { success: true, message: 'Buyer edited successfully!' };
  } catch (error) {
    return { success: false, message: 'An error occurred' };
  }
}
async function getBuyer(
      buyer_id: any,
      buyer_email: string
    ): Promise<{
      buyer?: any
      message?: string
    }> {
      const auth = new Auth()
      const currentUser = auth.currentUser()
      const token = currentUser?.token
    
      try {
        const response = await fetch(`http://127.0.0.1:3000/buyers/${buyer_id}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer' + ' ' + currentUser?.token
          }
        })
        if (!response.ok) {
                  const errorData = await response.json()
                  return { message: errorData.message || 'Failed to fetch buyer' }
                }
            
                const data_buyer = await response.json()
                return { buyer: data_buyer }
              } catch (error) {
                return { message: 'An error occurred' }
              }
            }

export const buyers = {
    getBuyer,
  getBuyers,
  editBuyer
};
