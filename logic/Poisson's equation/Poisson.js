import { SOR } from "../SOR/main.js";

function solve(n, f_ij, w, num) {
	let h = 1 / (n + 1);
	let f = f_ij.map((x) => [x * h ** 2]);

	let A = [];
	for (let i = 0; i < n ** 2; i++) {
		A[i] = [];
		for (let j = 0; j < n ** 2; j++) {
			if (i == j) A[i][j] = 4;
			else if (
				Math.abs(i - j) == 1 &&
				!(i % n == 0 && (j + 1) % n == 0) &&
				!(j % n == 0 && (i + 1) % n == 0)
			)
				A[i][j] = -1;
			else if (Math.abs(i - j) == n) A[i][j] = -1;
			else A[i][j] = 0;
		}
	}
	return SOR(A, f, w, num);
}

function solveF(n, fRule, w, num) {
	function f(x, y) {
		return eval(fRule);
	}
	let h = 1 / (n + 1);
	let f_ij = [];
	for (let i = 1; i <= n; i++) {
		for (let j = 1; j <= n; j++) {
			f_ij.push(f(j * h, i * h));
		}
	}
	return solve(n, f_ij, w, num);
}

export { solveF };
