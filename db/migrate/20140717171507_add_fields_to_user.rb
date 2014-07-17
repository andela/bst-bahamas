class AddFieldsToUser < ActiveRecord::Migration
  def change
  	add_column :users, :account_type, :string
  	add_column :users, :business_name, :string
  	add_column :users, :business_desc, :string
  	add_column :users, :website_url, :string
  	add_column :users, :phone_no, :string
  	add_column :users, :uuid, :string
  end

  def down
  	drop_column :users, :account_type, :string
  	drop_column :users, :business_name, :string
  	drop_column :users, :business_desc, :string
  	drop_column :users, :website_url, :string
  	drop_column :users, :phone_no, :string
  	drop_column :users, :uuid, :string
  end
end
