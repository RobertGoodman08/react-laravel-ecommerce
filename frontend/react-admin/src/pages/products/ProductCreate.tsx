import React, {Component, SyntheticEvent} from 'react';
import Wrapper from "../../secure/Wrapper";
import axios from "axios";
import {Navigate} from "react-router-dom";

class ProductCreate extends Component {

    state = {
        image: '',
        redirect: false,
    }
    title = '';
    description = '';
    image: File | null = null;
    price = 0;

    submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        let data = new FormData();
        data.append('title', this.title);
        data.append('description', this.description);
        if (this.image) {
            data.append('image', this.image);
        }
        data.append('price', this.price.toString());

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/admin/product', data);

            // Обработка успешного ответа
        } catch (error: any) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
        }

        this.setState({
            redirect: true
        })
    }

    upload = async (files: FileList | null) => {
        if (files === null) return;

        const data = new FormData();
        data.append('image', files[0]);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/admin/upload', data);
            const imageUrl = response.data.url; // Assuming the response contains the URL to the uploaded image

            this.setState({
                image: imageUrl
            });
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }



    render() {
        if(this.state.redirect) {
            return <Navigate to="/products" />
        }
        return (
            <Wrapper>
                <form onSubmit={this.submit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input type="text" className="form-control" name="title"
                               onChange={e => this.title = e.target.value}
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea className="form-control" name="description"
                                  onChange={e => this.description = e.target.value}
                        > </textarea>
                    </div>

                    <div className="form-group">
                        <label>Price</label>
                        <input type="number" className="form-control" name="price"
                               onChange={e => this.price = parseFloat(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Image</label>
                        <div className="input-group">
                            <input type="file" className="form-control" name="image"
                                   value={this.state.image ? this.state.image : ''}
                                   onChange={e => this.image = e.target.files ? e.target.files[0] : null}
                            />
                            <div className="input-group-append">
                                <label className="btn btn-primary">
                                    Upload <input type="file" hidden  onChange={e => this.upload(e.target.files)}  />
                                </label>
                            </div>
                        </div>
                    </div>

                    <br />

                    <button className="btn btn-outline-secondary">Save</button>
                </form>
            </Wrapper>
        )
    }
}

export default ProductCreate;