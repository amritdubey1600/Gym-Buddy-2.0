import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//context
import { WorkoutsContextProvider } from './context/WorkoutContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <WorkoutsContextProvider>
        <App />
      </WorkoutsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);



// 10:41:57	SELECT pd.id,count(pd.id),pd.keyword_id,pd.image_link,pd.title,pd.platform_id,pd.score,pd.flag_status,pd.description,       pd.url,pd.overall_rating,pd.selling_price,psm.seller_hash,psm.seller_name FROM counterfeit.product_details as pd,       counterfeit.product_seller_mapping as psm where pd.id = psm.product_details_id AND pd.keyword_id IN (1,2) AND pd.flag_status=0        AND pd.platform_id IN (1,2) group by pd.id LIMIT 0, 1000	Error Code: 1055. Expression #13 of SELECT list is not in GROUP BY clause and contains nonaggregated column 'counterfeit.psm.seller_hash' which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by	0.000 sec
