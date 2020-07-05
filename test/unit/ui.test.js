/**
 * @jest-environment jest-environment-jsdom-sixteen
 */



import nunjucks from 'nunjucks';
nunjucks.configure('client/views');
import bookServices from '../../client/js/book-service.js';
import * as utils from '../../client/js/utils.js';
nunjucks.configure('client/views');

beforeEach(() => {
    document.documentElement.innerHTML = '';
});

function makeFakeJSONFetch({ success, result }) {
    return function () {
        return new Promise((resolve, reject) => {
            const fakeJSON = {
                json: () =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve(result);
                        }, 10);
                    }),
            };

            setTimeout(
                () => (success ? resolve(fakeJSON) : reject(result)),
                30
            );
        });
    };
}

function makeMookNunjucks() {
    return {
        render(template) {
            return template;
        },
    };
}

// app
describe('fetch books', () => {
    test('All books', async () => {
        // fetch mock
        window.fetch = makeFakeJSONFetch({
            success: true,
            result: [{ id: 1 }],
        });

        const books = await bookServices.getAll();

        expect(Array.isArray(books)).toBe(true);
        expect(books[0].id).toBe(1);
    });

    test('Find books', async () => {
        // fetch mock
        window.fetch = makeFakeJSONFetch({
            success: true,
            result: [{ id: 1 }],
        });

        const books = await bookServices.search();

        expect(Array.isArray(books)).toBe(true);
        expect(books[0].id).toBe(1);
    });
});

describe('Utils', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    test('assign', () => {
        const book = { id: 1, title: 'El aleph' };
        const result = utils.assign(book, { author: 'Borges' });

        expect(result).toStrictEqual({
            id: 1,
            title: 'El aleph',
            author: 'Borges',
        });
        expect(book).toStrictEqual(book);
    });

    test('getRefs', () => {
        const $div = document.createElement('div');
        $div.setAttribute('data-ref', 'myEl');
        document.body.appendChild($div);

        const result = utils.getRefs(document.body);

        expect(result).toStrictEqual({ myEl: $div });
    });

    test('render', () => {
        window.nunjucks = makeMookNunjucks();
        utils.render('Hello', {}, document.body);

        expect(document.body.innerHTML).toBe('Hello');
    });




test('Verifico que el placeholder del input de busqueda tiene el valor deseado', () =>{


document.documentElement.innerHTML = nunjucks.render('home.html');

expect(document.getElementById('idplace').placeholder).toBe('Buscar libro')

});




    test('render with refs', () => {
        window.nunjucks = makeMookNunjucks();
        const refs = utils.render(
            '<div data-ref="myDiv"></div>',
            {},
            document.body
        );
        const div = document.body.firstElementChild;

        expect(refs).toStrictEqual({ myDiv: div });
    });

    test('LogoLink', () => {
        document.documentElement.innerHTML = nunjucks.render('../../client/views/_base.html');
        var brandDiv = document.getElementsByClassName("brand")[0];

        expect(brandDiv.children.length).toEqual(2);
        
        var aElement = brandDiv.children[0];
        
        expect(aElement.getAttribute("title")).toEqual("Bookli");
        expect(aElement.getAttribute("href")).toEqual("/");
        expect(aElement.children.length).toEqual(1);
        
        var imgElement = aElement.children[0];
        
        expect(imgElement.getAttribute("class")).toEqual("brand__logo");
        expect(imgElement.getAttribute("src")).toEqual("/assets/logo.svg");
        expect(imgElement.getAttribute("alt")).toEqual("bookli logo");
    });

    test('amazonLink', () => {
        document.documentElement.innerHTML = nunjucks.render('../../client/views/home.html');
        var form = document.getElementsByClassName("card filters")[0];

        expect(form.children.length).toEqual(4);
        
        var buyLabel = form.children[3];
        
        expect(buyLabel.getAttribute("class")).toEqual("filter");
        expect(buyLabel.children.length).toEqual(2);
        
        var input = buyLabel.children[0];
        
        expect(input.getAttribute("type")).toEqual("button");
        expect(input.getAttribute("onclick")).toEqual("window.open('//www.amazon.com/books-used-books-textbooks/b?ie=UTF8&node=283155','_blank')");
        expect(input.getAttribute("name")).toEqual("filter");

	var divBuy = buyLabel.children[1];
	expect(divBuy.textContent).toEqual("Comprar");
    });
});
