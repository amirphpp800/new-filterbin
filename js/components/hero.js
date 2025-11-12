// Hero Component - Empty
class HeroComponent {
    constructor() {}

    render() {
        return '';
    }

    mount(selector) {
        const element = document.querySelector(selector);
        if (element) {
            element.innerHTML = this.render();
        }
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HeroComponent;
}