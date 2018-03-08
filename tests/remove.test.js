import expect from 'expect';
import { getItem, setItem, removeItem } from '../src/index';

describe('Remove function', () => {
	afterEach(() => {
		localStorage.clear();
	});

    describe('The basics', () => {

        it('should be available', () => {

            expect(
                removeItem
            ).toExist();

        });

        it('should be a function', () => {

            expect(
                removeItem
            ).toBeA(
                Function
            )

        })

    });

    describe('Correct usage', () => {

		beforeEach(() => {
			localStorage.clear();
		});

        it('removing non-path string', () => {
            setItem('sampleKey', 'value');

			expect(
				getItem('sampleKey')
			).toBe('value');

			removeItem('sampleKey');

            expect(
			    getItem('sampleKey')
			).toBe(null);

        });

		it('removing path string', () => {
			setItem('some/key', 'value');

			expect(
				getItem('some/key')
			).toBe('value');

			console.log(getItem('some/key'));

			removeItem('some/key');

			expect(
				getItem('some/key')
			).toBe(null);

		});

		it('removing non-path array', () => {
			setItem(['sampleKey'], 'value');

			expect(
				getItem(['sampleKey'])
			).toBe('value');

			removeItem(['sampleKey']);

			expect(
				getItem(['sampleKey'])
			).toBe(null);

		});

		it('removing path array', () => {
			setItem(['some', 'key'], 'value');

			expect(
				getItem(['some', 'key'])
			).toBe('value');

			removeItem(['some', 'key']);

			expect(
				getItem(['some', 'key'])
			).toBe(null);

		});

    });

});