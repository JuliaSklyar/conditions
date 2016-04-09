class Api::ConditionsController < ApplicationController

  def index
    data = File.read('4ccd59e42b8d2aef6e2d/conditions.json')
    respond_to do |format|
      format.json { render json: data }
    end
  end
end