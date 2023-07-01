# btck-JSB02
-- 1 web cho người dùng: 
-- 1 web cho admin: quản lý website người dùng (thêm xóa sửa xem dữ liệu );

-- website thương mại: -- bán điện thoại, bán skin game, bán phim, bán ticket ...

-- quản lý sản phẩm

  -- website người dùng: - hiện thị danh sách sản phẩm
			 - hiện thị chi tiết thông tin sản phẩm	
			 - thêm xóa sửa xem sản phẩm vào giỏ hàng
  -- website quản trị:  - quản lý danh sách sản phẩm
				+ thêm, xóa, sửa sản phẩm 
				+ xem chi tiết sản phẩm
			- quản lý danh mục sản phẩm.
				+ thêm xóa sửa 
		 	- quản lý người dùng
				+ thêm, sửa người dùng
				+ disabled người dùng (active: true/ false) 
				+ xem chi tiết thông tin người dùng. 

-- abount us, liên hệ, tin tức, ...

-- quản lý khóa học ở trường mindx. 
-- quản lý đào tạo nhân viên
-- quản lý tin tức.


--- Sản Phẩm(id, name, price, description, amount, categories);
--- categories (id, name: 'iphone'/ 'oppo'/ samsung, 'MI')
--- người dùng(id, fullName, email, phone_number, age, address, active: true/false, role: 0/1 admin/user... )
-- role (id, role: 0/1) 0: admin. 1:user.
		role [
			{
				roleId: 1, 
				role: 0			
			}
			{
				roleId: 2, 
				role: 1		
			}
		     ]	
-- login/ register/: có rồi 
-- Home/ sản phẩm/ người dùng  
-- sản phẩm/ người dùng/  categories	

-- giao diện: 

-> đề tài 
	--> reponsitory: 'link github'
	--> trello: email trello
	--> link firebase
		=> j.bnguyendzu@gmail.com

- buổi 9: Tên đề tài/ logo/ github/ firebase/ trello
