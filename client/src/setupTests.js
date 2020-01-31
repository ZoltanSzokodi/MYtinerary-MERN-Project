// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import { configure } from 'enzyme';
// The Adapter is responsible for rendering the UI library (React 16, in this case)
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
