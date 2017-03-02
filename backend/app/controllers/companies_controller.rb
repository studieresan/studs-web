class CompaniesController < ApplicationController
  before_action :authenticate, :except => [:index]

  def index
    if current_user.type_of_user == 'studs_member'
      return render json: []
    else
      return render json: Company.all
    end
  end

  def create
    @company = Company.new(company_params)

    if @company.save
      render :show, status: :created, location: @company
    else
      render json: @company.errors, status: :unprocessable_entity
    end
  end

  def update
    if @company.update(company_params)
      render :show, status: :ok, location: @company
    else
      render json: @company.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @company.destroy
  end

  private
    def set_company
      @company = Company.find(params[:id])
    end

    def company_params
      params.require(:company).permit(:schedule, :information, :company_id, :before_form_id, :after_form_id, :company_id, :before_form_url, :after_form_url, :responsible_user_id, :date)
    end
end
