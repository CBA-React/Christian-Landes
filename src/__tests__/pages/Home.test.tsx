import { render } from '@testing-library/react';

import Home from '@/app/page';

describe('Test Component', () => {
    it('should render the heading', () => {
        render(<Home />);
    });
});
