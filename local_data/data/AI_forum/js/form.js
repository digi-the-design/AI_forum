$(document).ready(function () {
	$('#contactForm').submit(function (event) {
		var email = $('#email').val().trim();
		var furigana = $('#furigana').val().trim();
		var name = $('#name').val().trim();
		var gender = $('input[name="gender"]:checked').val();
		var organization = $('#organization').val().trim();
		var full_address = $('#address').val().trim();
		var postal_code = $('#postal_code').val().trim(); // postal_codeの値を取得
		var phone = $('#phone').val().trim();
		var category = [];
		$('input[name="category[]"]:checked').each(function () {
			category.push($(this).val().trim());
		});
		var message = $('#message').val().trim();
		var emailErrorSpan = $('#email-error'); // Get the error message span

		// Clear previous error messages
		$('.error-message').text('').hide();
		$('.error-container').css('display', 'none'); // Hide error container initially

		var hasError = false; // Flag to check if there is any error

		// Validate email format
		if (!email.includes('@')) {
			emailErrorSpan.text('※有効なメールアドレスを入力してください。').show();
			hasError = true;
			event.preventDefault();
		}

		// Validate furigana (furigana check)
		var furiganaRegex = /^[ァ-ヶー　]*$/;
		if (furigana === '') {
			$('#furigana-error').text('※フリガナを入力してください。').show();
			hasError = true;
			event.preventDefault();
		} else if (!furiganaRegex.test(furigana)) {
			$('#furigana-error').text('※フリガナはカタカナで入力してください。').show();
			hasError = true;
			event.preventDefault();
		}

		// Validate name
		if (name === '') {
			$('#name-error').text('※お名前を入力してください。').show();
			hasError = true;
			event.preventDefault();
		}

		// Validate gender
		if (!gender) {
			$('#gender-error').text('※性別を選択してください。').show();
			hasError = true;
			event.preventDefault();
		}

		// Validate organization
		if (organization === '') {
			$('#organization-error').text('※団体・会社名を入力してください。').show();
			hasError = true;
			event.preventDefault();
		}

		// Validate full_address
		if (full_address === '') {
			$('#address-error').text('※住所を入力してください。').show();
			hasError = true;
			event.preventDefault();
		}

		// Validate postal_code
		var postalCodeRegex = /^\d{3}\d{4}$/;
		if (postal_code === '') {
			$('#postal_code-error').text('※郵便番号を入力してください。').show();
			hasError = true;
			event.preventDefault();
		} else if (!postalCodeRegex.test(postal_code)) {
			$('#postal_code-error').text('※有効な郵便番号を入力してください（例: 123-4567）。').show();
			hasError = true;
			event.preventDefault();
		}

		// Validate phone
var phoneRegex = /^(0\d{1,4}-?\d{1,4}-?\d{4}|0[789]0-?\d{4}-?\d{4})$/;
if (phone === '') {
    $('#phone-error').text('※電話番号を入力してください。').show();
    hasError = true;
    event.preventDefault();
} else if (!phoneRegex.test(phone)) {
    $('#phone-error').text('※有効な電話番号を入力してください（例: 03-1234-5678 または 090-1234-5678 または 0312345678 または 09012345678）。').show();
    hasError = true;
    event.preventDefault();
}

		// Validate category
		if (category.length === 0) {
			$('#category-error').text('※お問い合わせの分類を選択してください。').show();
			hasError = true;
			event.preventDefault();
		}

		// Validate message
		if (message === '') {
			$('#message-error').text('※お問い合わせ内容を入力してください。').show();
			hasError = true;
			event.preventDefault();
		}

		// If there is any error, display the error container
		if (hasError) {
			$('.error-container').css('display', 'block');
		}
	});
});