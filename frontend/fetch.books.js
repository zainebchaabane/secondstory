document.addEventListener('DOMContentLoaded', async () => {
    const container = document.querySelector('.row'); // Select the container where products will be displayed

    try {
        const response = await fetch('http://localhost:5000/product/books'); 
        if (!response.ok) throw new Error('Failed to fetch products data');

        const products = await response.json();

        // Iterate through each product and generate HTML
        products.forEach(product => {
            const productCard = `
                <div class="col-sm-6 col-md-4 col-lg-3">
                    <div class="box">
                        <div class="option_container">
                            <div class="options">
                                <a href="panier.html" class="option1">
                                    Add To Cart
                                </a>
                                <a href="buynow.html" class="option2">
                                    Buy Now
                                </a>
                            </div>
                        </div>
                        <div class="img-box">
                            <img src="${product.image}" alt="${product.name}">
                        </div>
                        <div class="detail-box">
                            <h5>
                                ${product.name}
                            </h5>
                            <h6>
                                ${product.price} DT
                            </h6>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += productCard;
        });

        // const genderSelect = document.getElementById('Gender');
        // const categorySelect = document.getElementById('Category');

        const productCards = document.querySelectorAll('.col-sm-6.col-md-4.col-lg-3');

        // function filterImagesGender() {
        //     const selectedValue = genderSelect.value.toLowerCase();

        //     productCards.forEach(card => {
        //         const gender = card.getAttribute('data-gender').toLowerCase();
        //         if (selectedValue === 'all' || gender === selectedValue) {
        //             card.style.display = 'block';
        //         } else {
        //             card.style.display = 'none';
        //         }
        //     });
        // }

        // function filterImagesCategory() {
        //     const selectedValue = categorySelect.value.toLowerCase();

        //     productCards.forEach(card => {
        //         const category = card.getAttribute('data-category').toLowerCase();
        //         if (selectedValue === 'all' || category === selectedValue) {
        //             card.style.display = 'block';
        //         } else {
        //             card.style.display = 'none';
        //         }
        //     });
        // }

        // Add event listener for change event
        // genderSelect.addEventListener('change', filterImagesGender);
        // categorySelect.addEventListener('change', filterImagesCategory);

    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = '<p>Failed to load products. Please try again later.</p>';
    }
});
