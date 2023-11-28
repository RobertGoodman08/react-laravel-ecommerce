import React, { useState, useEffect, ChangeEvent } from 'react';
import Wrapper from '../../secure/Wrapper';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import axios from 'axios';

function ProductEdit() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [state, setState] = useState({
        redirect: false,
        title: '',
        id: 0,
        description: '',
        image: '' as string | File,
        price: 0,
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productCall = await axios.get(`http://127.0.0.1:8000/api/admin/product/${id}`);
                const product = productCall.data.data;

                setState((prevState) => ({
                    ...prevState,
                    title: product.title,
                    description: product.description,
                    image: product.image,
                    price: product.price,
                }));
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            const imageUrl = URL.createObjectURL(selectedFile);

            setState((prevState) => ({
                ...prevState,
                image: selectedFile,
            }));

            setImagePreview(imageUrl);
        }
    };

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            let imageData: string | File | undefined = state.image;
            if (state.image && typeof state.image !== 'string') {
                const formData = new FormData();
                formData.append('image', state.image);
                const response = await axios.post('http://127.0.0.1:8000/api/admin/upload', formData);
                imageData = response.data.imageUrl;
            }

            await axios.put(`http://127.0.0.1:8000/api/admin/product/${id}`, {
                title: state.title,
                description: state.description,
                image: imageData, // Отправляем данные об изображении
                price: state.price,
            });

            setState((prevState) => ({ ...prevState, redirect: true }));
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        if (state.image && typeof state.image !== 'string') {
            setImagePreview(URL.createObjectURL(state.image));
        } else if (typeof state.image === 'string') {
            setImagePreview(`http://localhost:8000/images/${state.image}`);
        }
    }, [state.image]);




    if (state.redirect) {
        return <Navigate to="/products" />;
    }


    return (
        <Wrapper>
            <form onSubmit={submit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={state.title}
                        onChange={(e) => setState({ ...state, title: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        className="form-control"
                        name="description"
                        value={state.description}
                        onChange={(e) => setState({ ...state, description: e.target.value })}
                    ></textarea>
                </div>

                <div className="form-group">
                    <label>Price</label>
                    <input
                        type="number"
                        className="form-control"
                        name="price"
                        value={state.price}
                        onChange={(e) => setState({ ...state, price: parseInt(e.target.value, 10) || 0 })}
                    />
                </div>

                <div className="form-group">
                    <label>Image</label>
                    <div className="input-group">
                        <input
                            type="file"
                            className="form-control"
                            name="image"
                            onChange={handleFileChange}
                        />
                    </div>
                    {/* Render the image preview */}
                    <div className="image-preview">
                        {imagePreview ? (
                            <img src={imagePreview} alt="Product" width="50" />
                        ) : (
                            <img src="http://localhost:8000/images/placeholder.jpg" alt="No Image" width="50" />
                        )}
                    </div>
                </div>

                <button className="btn btn-outline-secondary">Save</button>
            </form>
        </Wrapper>
    );
}

export default ProductEdit;
