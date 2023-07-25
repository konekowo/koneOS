/* eslint-disable prettier/prettier */
export class Color {
    private value: number;

    /**
     * @deprecated koneOS Color class is deprecated, use PIXI.Color instead.
     */
    public constructor(r: number, g: number, b: number, a: number) {
        this.value = ((a & 0xff) << 24) | ((r & 0xff) << 16) | ((g & 0xff) << 8) | ((b & 0xff) << 0);
        Color.testColorValueRange(r, g, b, a);
        console.warn("koneOS Color class is deprecated, use PIXI.Color instead.");
    }

    private static testColorValueRange(r: number, g: number, b: number, a: number) {
        let rangeError = false;
        let badComponentString = "";

        if (a < 0 || a > 255) {
            rangeError = true;
            badComponentString = badComponentString + " Alpha";
        }
        if (r < 0 || r > 255) {
            rangeError = true;
            badComponentString = badComponentString + " Red";
        }
        if (g < 0 || g > 255) {
            rangeError = true;
            badComponentString = badComponentString + " Green";
        }
        if (b < 0 || b > 255) {
            rangeError = true;
            badComponentString = badComponentString + " Blue";
        }
        if (rangeError) {
            throw new Error("Color parameter outside of expected range:" + badComponentString);
        }
    }

    public getRGB() {
        return this.value;
    }

    public getRed() {
        return (this.getRGB() >> 16) & 0xff;
    }

    /**
     * Returns the green component in the range 0-255 in the default sRGB
     * space.
     * @return the green component.
     * @see #getRGB
     */
    public getGreen() {
        return (this.getRGB() >> 8) & 0xff;
    }

    /**
     * Returns the blue component in the range 0-255 in the default sRGB
     * space.
     * @return the blue component.
     * @see #getRGB
     */
    public getBlue() {
        return (this.getRGB() >> 0) & 0xff;
    }

    /**
     * Returns the alpha component in the range 0-255.
     * @return the alpha component.
     * @see #getRGB
     */
    public getAlpha() {
        return (this.getRGB() >> 24) & 0xff;
    }

    public brighter() {
        let r: number = this.getRed();
        let g: number = this.getGreen();
        let b: number = this.getBlue();
        const alpha: number = this.getAlpha();

        /* From 2D group:
         * 1. black.brighter() should return grey
         * 2. applying brighter to blue will always return blue, brighter
         * 3. non pure color (non zero rgb) will eventually return white
         */
        const i = Number(1.0 / (1.0 - Color.FACTOR));
        if (r == 0 && g == 0 && b == 0) {
            return new Color(i, i, i, alpha);
        }
        if (r > 0 && r < i) r = i;
        if (g > 0 && g < i) g = i;
        if (b > 0 && b < i) b = i;

        return new Color(
            Math.min(Number(r / Color.FACTOR), 255),
            Math.min(Number(g / Color.FACTOR), 255),
            Math.min(Number(b / Color.FACTOR), 255),
            alpha,
        );
    }

    /**
     * Creates a new {@code Color} that is a darker version of this
     * {@code Color}.
     * <p>
     * This method applies an arbitrary scale factor to each of the three RGB
     * components of this {@code Color} to create a darker version of
     * this {@code Color}.
     * The {@code alpha} value is preserved.
     * Although {@code brighter} and
     * {@code darker} are inverse operations, the results of a series
     * of invocations of these two methods might be inconsistent because
     * of rounding errors.
     * @return  a new {@code Color} object that is
     *                    a darker version of this {@code Color}
     *                    with the same {@code alpha} value.
     * @see        Color#brighter
     * @since      1.0
     */
    public darker() {
        return new Color(
            Math.max(Number(this.getRed() * Color.FACTOR), 0),
            Math.max(Number(this.getGreen() * Color.FACTOR), 0),
            Math.max(Number(this.getBlue() * Color.FACTOR), 0),
            this.getAlpha(),
        );
    }

    private static FACTOR = 0.7;
}
