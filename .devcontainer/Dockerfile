FROM registry.gitlab.syncad.com/hive/wax/wax-python-runtime:ubuntu24.04-1

WORKDIR /workspace
COPY . /workspace

RUN /poetry_venv/bin/pip install 'wax==0.3.10.dev785+aeb3abb8'
RUN ln -s /poetry_venv /workspace/.venv

USER root
RUN echo 'source /poetry_venv/bin/activate' > /etc/profile.d/venv.sh
RUN chmod +x /etc/profile.d/venv.sh

USER user

SHELL ["/bin/bash", "-c"]
CMD ["bash"]
