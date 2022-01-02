import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';

function BlogDetail() {

    const {id} = useParams();

    const [blog, setBlog] = useState([])
    const [get_error, setError] = useState([])


    useEffect( () => {
        axios({
            method: "GET",
            url: `http://localhost:8000/api/v1/feed/${id}`
        }).then(response => {
            setBlog(response.data)
        }).catch(function(error) { setError(error.message); })
    }, [id])


    if(Object.keys(get_error).length > 0) {
        return(
            <p>Записей нет!</p>
        )
    } else {
        return (
            <div>
              <h1>Hacker News</h1>
                {blog.title} | {blog.body}
            </div>
        );
    }

}

export default BlogDetail;