class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.string :name
      t.integer :duration_in_days
      t.integer :price

      t.timestamps
    end
  end
end
