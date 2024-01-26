import { Reviews, Requests } from './store.js';

new Vue({
    el: '#app',
    data: {
        reviews: Reviews,
        requests: Requests,

        styles: {

            backgroundColor: 'white',
            color: 'indigo',
            textAlign: 'center',
        },
        
        headerStyles: {
            fontSize: '2em',
            fontFamily: 'fantasy',
        },

    },

    template: `
        <div :style="styles">

        
            <h1 :style="headerStyles">Review Central Prototip</h1>

            <h2>Reviews:</h2>

            <ul>
                <li v-for="review in reviews" :key="review.id">
                    {{ review.user }} - {{ review.category }} - {{ review.description }}
                    <ul>
                        <li v-for="comment in review.comments" :key="comment.id">{{ comment.user }}: {{ comment.text }}</li>
                    </ul>
                </li>
            </ul>


            <h2>Requests:</h2>

            <ul>
                <li v-for="request in requests" :key="request.id">
                    {{ request.user }} - {{ request.category }} - {{ request.description }}
                    <ul>
                        <li v-for="comment in request.comments" :key="comment.id">{{ comment.user }}: {{ comment.text }}</li>
                    </ul>
                </li>
            </ul>


        </div>
    `,
});