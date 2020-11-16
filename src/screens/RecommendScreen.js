import React, { useState, useEffect } from 'react';
import useRecommend from '../hooks/useRecommend'
import { Link, Route } from 'react-router-dom';

function RecommendScreen(props){

    const { docs } = useRecommend();
    
    console.log(docs)

    return (
        <div>
        <div className="back-to-result">
        <Link to={{
            pathname: '/recommendation-system/',
            aboutProps: {
              recommends: docs,
              //airbnb: recommends[1].airbnb,
            }
            }}>
            Recommendation system
        </Link>
        </div>
        <div className="back-to-result">
        <Link to={{
            pathname: '/searches-views/',
            aboutProps: {
              //recommends: docs,
              //airbnb: recommends[1].airbnb,
            }
            }}>
            Views and Searches
        </Link>
        </div>
        </div>
    )

}

export default RecommendScreen;