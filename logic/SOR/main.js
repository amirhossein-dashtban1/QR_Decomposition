import {
	norm_inf,
	inverse,
	sum,
	product,
	scalarProduct,
	lowerTriangular,
	diagonal,
	upperTriangular,
	show,
} from "../matrix-utilities/utility.js";

function SOR(A, b, w = 1.25, num = 5, x_0 = new Array(b.length).fill([0])) {
	const L = lowerTriangular(A);
	const D = diagonal(A);
	const U = upperTriangular(A);

	let xk_1 = x_0;
	let x_k;
	let norm;
	let result = [];
	do {
		let D_wL_inv = inverse(sum(D, scalarProduct(w, L)));
		let pro1 = sum(scalarProduct(1 - w, D), scalarProduct(-w, U));
		let repMat = product(D_wL_inv, pro1);
		let repMat_x0 = product(repMat, xk_1);
		let c = product(scalarProduct(w, D_wL_inv), b);
		x_k = sum(repMat_x0, c);

		norm = norm_inf(x_k, xk_1);
		xk_1 = x_k;
		result.push({ x_k, norm });
	} while (--num > 0);
	return result;
}

export { SOR };
