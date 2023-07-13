using System.ComponentModel.DataAnnotations;

namespace es_manage.api.Models {
	public class LoginRequestModel {
		// Username dengan tipe data string, not null, required
		[Required(ErrorMessage = "Username tidak boleh kosong")]
		public string UserName { get; set; }

		// Password dengan tipe data string, not null, required
		[Required(ErrorMessage = "Password tidak boleh kosong")]
		public string Password { get; set; }
	}
	
	public class LoginResponseModel 
	
	{
		public string UserName {get; set;}
		public TokenInfo Token {get; set;}
	}
	
	public class TokenInfo 
	{
		public string AccessToken {get; set;}
	}
	
	
}