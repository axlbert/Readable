import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CategoriesLeftNav extends Component {

    render() {
        const { categories, selectedCategory } = this.props;
        return (
            <div className='col-md-4'>
                <div className='titleText'>Available Categories</div>
                {
                    categories.map((c, i) => {
                        const linkPath = `/${c.path}`;
                        if (typeof selectedCategory !== 'undefined' &&
                            selectedCategory === c.path) {
                            return (
                                <Link
                                    key={i} to={linkPath}
                                      className='btn btn-default'
                                >
                                    {c.name}
                                </Link>
                            );
                        }
                        return (
                            <Link key={i} to={linkPath} className='btn btn-default'>
                                {c.name}
                            </Link>
                        );
                    })
                }
            </div>
        );
    }
}

export default CategoriesLeftNav;
